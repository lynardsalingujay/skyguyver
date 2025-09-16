import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

function ClientDashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
        >
          Logout
        </button>
      </div>
      <p>Welcome, {user?.email} (Client)</p>
      {/* Add client features here */}
    </div>
  );
}

export default ClientDashboard;
