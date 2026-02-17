import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Search,
    Plus,
    MoreVertical,
    User as UserIcon,
    Mail,
    Phone,
    Calendar,
    Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

interface Member {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    joinDate: string;
}

interface MemberListProps {
    onAddMember: () => void;
}

const MemberList = ({ onAddMember }: MemberListProps) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get('/api/gym/members');
                setMembers(res.data);
            } catch (err) {
                console.error('Error fetching members', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-red-600" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search members by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                    />
                </div>
                <button
                    onClick={onAddMember}
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95 whitespace-nowrap"
                >
                    <Plus size={20} />
                    Add Member
                </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-950/50">
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">Member</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">Contact</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">Joined</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member, index) => (
                                    <motion.tr
                                        key={member._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-zinc-800/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-red-600/10 group-hover:text-red-500 transition-colors">
                                                    <UserIcon size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-zinc-100">{member.name}</p>
                                                    <p className="text-sm text-zinc-500">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                    <Mail size={14} className="text-zinc-600" />
                                                    <span>{member.email}</span>
                                                </div>
                                                {member.phone && (
                                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                        <Phone size={14} className="text-zinc-600" />
                                                        <span>{member.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-zinc-600" />
                                                {new Date(member.joinDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">
                                        {searchTerm ? `No members matching "${searchTerm}"` : 'No members found. Add your first member to get started!'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length > 0 && (
                    <div className="px-6 py-4 border-t border-zinc-800 flex justify-between items-center bg-zinc-950/20 text-sm">
                        <p className="text-zinc-500">
                            Showing <span className="text-zinc-300 font-bold">{filteredMembers.length}</span> members
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="p-1 px-3 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-all" disabled>
                                Prev
                            </button>
                            <button className="p-1 px-3 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-all" disabled>
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberList;
