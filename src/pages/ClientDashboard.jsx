import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY;

function ClientDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [assistant, setAssistant] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  // Fetch assistant info if assistant_id exists
  useEffect(() => {
    const fetchAssistant = async () => {
      if (!user?.id) return;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("assistant_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError("Failed to fetch profile.");
        return;
      }

      if (profile?.assistant_id) {
        // Fetch assistant info from Vapi
        try {
          const response = await fetch(
            `https://api.vapi.ai/assistant/${profile.assistant_id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${VAPI_API_KEY}`,
              },
            }
          );
          const data = await response.json();
          setAssistant({
            id: profile.assistant_id,
            name: data.name,
            status: data.status || "active",
          });
        } catch (err) {
          setError("Failed to fetch assistant info.");
        }
      }
    };

    fetchAssistant();
  }, [user]);

  const handleCreateAssistant = async () => {
    setIsCreating(true);
    setError("");
    try {
      const response = await fetch("https://api.vapi.ai/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VAPI_API_KEY}`,
        },
        body: JSON.stringify({
          name: "Client Assistant",
          // Add other required fields here
        }),
      });

      const responseBody = await response.text();
      if (!response.ok) {
        throw new Error(
          `Failed to create assistant: ${response.status} - ${responseBody}`
        );
      }

      const data = JSON.parse(responseBody);
      setAssistant({
        id: data.id,
        name: data.name,
        status: data.status || "active",
      });

      // Update Supabase profile with assistant_id
      const { error: dbError } = await supabase
        .from("profiles")
        .update({ assistant_id: data.id })
        .eq("id", user.id);

      if (dbError) {
        setError("Assistant created, but failed to link in database.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleBack}
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded font-medium"
          >
            Return to Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      <p>Welcome, {user?.email} (Client)</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Assistant Configuration</h2>
        {assistant ? (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <p>
              <span className="font-bold">Name:</span> {assistant.name}
            </p>
            <p>
              <span className="font-bold">Status:</span> {assistant.status}
            </p>
            <p>
              <span className="font-bold">Assistant ID:</span> {assistant.id}
            </p>
          </div>
        ) : (
          <button
            onClick={handleCreateAssistant}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Assistant"}
          </button>
        )}
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default ClientDashboard;
