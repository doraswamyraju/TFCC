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
    Loader2,
    Trash2,
    Edit2,
    ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EditMemberModal from './EditMemberModal';
import AssignPlanModal from './AssignPlanModal';

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
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/gym/members');
            setMembers(res.data);
        } catch (err) {
            console.error('Error fetching members', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this member?')) return;

        setIsDeleting(id);
        try {
            await axios.delete(`/api/gym/members/${id}`);
            setMembers(members.filter(m => m._id !== id));
        } catch (err) {
            console.error('Error deleting member', err);
            alert('Failed to delete member');
        } finally {
            setIsDeleting(null);
            setOpenMenuId(null);
        }
    };

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
                                        <td className="px-6 py-4 text-right relative">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === member._id ? null : member._id)}
                                                    className={`p-2 rounded-lg transition-all ${openMenuId === member._id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
                                                >
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>

                                            <AnimatePresence>
                                                {openMenuId === member._id && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-10"
                                                            onClick={() => setOpenMenuId(null)}
                                                        />
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            className="absolute right-6 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-20 py-1.5 overflow-hidden"
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedMember(member);
                                                                    setIsEditModalOpen(true);
                                                                    setOpenMenuId(null);
                                                                }}
                                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                                                            >
                                                                <Edit2 size={16} />
                                                                Edit Details
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedMember(member);
                                                                    setIsAssignModalOpen(true);
                                                                    setOpenMenuId(null);
                                                                }}
                                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                                                            >
                                                                <ClipboardList size={16} />
                                                                Assign Plan
                                                            </button>
                                                            <div className="h-px bg-zinc-800 my-1" />
                                                            <button
                                                                onClick={() => handleDelete(member._id)}
                                                                disabled={isDeleting === member._id}
                                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                            >
                                                                {isDeleting === member._id ? (
                                                                    <Loader2 size={16} className="animate-spin" />
                                                                ) : (
                                                                    <Trash2 size={16} />
                                                                )}
                                                                Remove Member
                                                            </button>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </AnimatePresence>
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

            <EditMemberModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={fetchMembers}
                member={selectedMember}
            />

            <AssignPlanModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onSuccess={fetchMembers}
                member={selectedMember}
            />
        </div >
    );
};

export default MemberList;
