
import { useAuth } from '../../context/AuthContext';


const GymDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-3xl font-bold">Gym Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, {user?.name}</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </header>
                <div className="bg-zinc-900 p-6 rounded-lg">
                    <p>Dashboard content coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default GymDashboard;
