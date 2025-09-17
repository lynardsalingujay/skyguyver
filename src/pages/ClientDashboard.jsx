import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY;

function ClientDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [assistant, setAssistant] = useState(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [model, setModel] = useState(null);

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
          setModel(data.model); // Store the full model object
          setSystemPrompt(data.model?.messages?.[0]?.content || ""); // <-- This fills the field
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
          name: `${user.email} Assistant`, // <-- Use client email for assistant name
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

      // Fetch the full assistant object to get the model
      const fetchResponse = await fetch(
        `https://api.vapi.ai/assistant/${data.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${VAPI_API_KEY}`,
          },
        }
      );
      const fetchData = await fetchResponse.json();
      setModel(fetchData.model);
      setSystemPrompt(fetchData.model?.messages?.[0]?.content || "");

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

  const handleSavePrompt = async () => {
    console.log("Save Prompt button clicked");
    if (!assistant?.id || !model) {
      console.log("Missing assistant or model", assistant, model);
      return;
    }
    setIsSavingPrompt(true);
    setError("");
    setSuccess("");
    try {
      const updatedModel = {
        provider: model.provider || "openai",
        model: model.model || "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
        ],
        toolIds: Array.isArray(model.toolIds) ? model.toolIds : [],
        maxTokens: typeof model.maxTokens === "number" ? model.maxTokens : 50,
        temperature:
          typeof model.temperature === "number" ? model.temperature : 0,
      };

      console.log(
        "PATCH URL:",
        `https://api.vapi.ai/assistant/${assistant.id}`
      );
      console.log("PATCH payload:", { model: updatedModel });

      const response = await fetch(
        `https://api.vapi.ai/assistant/${assistant.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${VAPI_API_KEY}`,
          },
          body: JSON.stringify({
            model: updatedModel,
          }),
        }
      );
      const responseBody = await response.text();
      console.log("PATCH response:", responseBody);
      if (!response.ok) {
        throw new Error(
          `Failed to update system prompt: ${response.status} - ${responseBody}`
        );
      }
      setSuccess("System prompt updated successfully!");
      // Refetch assistant info
      const refreshed = await fetch(
        `https://api.vapi.ai/assistant/${assistant.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${VAPI_API_KEY}`,
          },
        }
      );
      const refreshedData = await refreshed.json();
      setModel(refreshedData.model);
      setSystemPrompt(refreshedData.model?.messages?.[0]?.content || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    // Only fetch if assistant exists and model is not set
    if (assistant?.id && !model) {
      const fetchModel = async () => {
        try {
          const response = await fetch(
            `https://api.vapi.ai/assistant/${assistant.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${VAPI_API_KEY}`,
              },
            }
          );
          const data = await response.json();
          setModel(data.model);
          setSystemPrompt(data.model?.messages?.[0]?.content || "");
        } catch (err) {
          setError("Failed to fetch assistant model.");
        }
      };
      fetchModel();
    }
  }, [assistant, model]);

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
            <div className="mt-4">
              <label className="block font-bold mb-2" htmlFor="systemPrompt">
                System Prompt
              </label>
              <textarea
                id="systemPrompt"
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white mb-2"
                rows={10}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter system prompt..."
              />
              <button
                onClick={handleSavePrompt}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
                // disabled={isSavingPrompt} // Remove for debugging
              >
                {isSavingPrompt ? "Saving..." : "Save Prompt"}
              </button>
              {success && <p className="text-green-400 mt-2">{success}</p>}
            </div>
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
