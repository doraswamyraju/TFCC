
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">My Dashboard</h1>
                <button
                    onClick={logout}
                    className="text-xs text-gray-400 underline"
                >
                    Logout
                </button>
            </header>
            <div className="bg-zinc-900 rounded-xl p-4 mb-4">
                <h2 className="text-lg font-bold mb-2">Welcome, {user?.name}</h2>
                <p className="text-gray-400 text-sm">Your fitness journey starts here.</p>
            </div>
        </div>
    );
};

export default UserDashboard;
