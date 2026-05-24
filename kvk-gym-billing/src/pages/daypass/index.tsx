import { CreditCard, Edit, Eye, MoreVertical, Plus, Search } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function Daypass() {

    const [searchTerm, setSearchTerm] = useState("");
    const [openAction, setOpenAction] = useState<{ id: string; top: number; left: number } | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoadingMembers, setIsLoadingMembers] = useState(false);
    const [membersError, setMembersError] = useState<string | null>(null);
    const [members, setMembers] = useState<any[]>([]); // Replace with actual member type
    const start = (page - 1) * pageSize;
    const total = 0; // Replace with actual total from API
    const totalPages = Math.ceil(total / pageSize);
    const pageItems: any[] = [];

    const openNewDaypassModal = () => {
        // Logic to open the new daypass registration modal
        console.log("Open new daypass registration modal");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Daypass Registration</h1>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-100">
                                Today
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Search for returning members or register a new one</p>
                    </div>
                    <div className="w-full max-w-md">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm shadow-sm">
                            <Search size={16} className="text-gray-400" />
                            <input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full outline-none text-sm"
                                placeholder="Search by name, phone, member ID, or status..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={openNewDaypassModal} className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white rounded cursor-pointer bg-blue-700 transition text-sm">
                            <Plus size={14} />
                            New Daypass
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm">
                                <thead>
                                    <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                                        <th className="py-2 px-3">MEMBER</th>
                                        <th className="py-2 px-3">AGE</th>
                                        <th className="py-2 px-3">GENDER</th>
                                        <th className="py-2 px-3">PHONE</th>
                                        <th className="py-2 px-3">STATUS</th>
                                        <th className="py-2 px-3">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoadingMembers ? (
                                        <tr>
                                            <td colSpan={6} className="py-8">
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                                                    <span className="text-sm text-gray-600">Loading members...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : membersError ? (
                                        <tr>
                                            <td colSpan={6} className="py-8">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-sm text-red-600">{membersError}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : pageItems.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-sm text-gray-500">No members found</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        pageItems.map((p) => (
                                            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-2 px-3 align-top">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">{p.name.split(' ').map((n : string) => n[0]).slice(0, 2).join('')}</div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                                            <div className="text-xs text-blue-600">{p.pid}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-3 align-top text-gray-700">{p.age}</td>
                                                <td className="py-2 px-3 align-top"><span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{p.gender}</span></td>
                                                <td className="py-2 px-3 align-top text-gray-700">{p.phone}</td>
                                                <td className="py-2 px-3 align-top">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'approved'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : p.status === 'pending'
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {p.status === 'approved' ? 'Active' : p.status === 'pending' ? 'Inactive' : 'Blocked'}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-3 align-top text-gray-500">
                                                    <div className="relative inline-block">
                                                        <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                                            const menuWidth = 144; // w-36
                                                            let left = rect.right - menuWidth;
                                                            left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
                                                            const top = rect.bottom + 8;
                                                            setOpenAction(openAction && openAction.id === p.id ? null : { id: p.id, top, left });
                                                        }} className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
                                                            <MoreVertical size={14} />
                                                        </button>
                                                    </div>

                                                    {openAction && openAction.id === p.id && createPortal(
                                                        <div style={{ position: 'fixed', top: openAction.top, left: openAction.left, width: 176 }} onMouseDown={(e) => e.stopPropagation()} className="rounded-md bg-white border shadow-lg z-50">
                                                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                                                <Eye size={14} /> View
                                                            </button>
                                                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                                                <CreditCard size={14} /> Membership
                                                            </button>
                                                        </div>,
                                                        document.body,
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center justify-between">
                        <div className="text-sm text-gray-600">Showing {total === 0 ? 0 : start + 1} to {Math.min(start + pageSize, total)} of {total} entries</div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-gray-600">Rows:</label>
                                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="border rounded-md px-2 py-1 text-sm">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                </select>
                            </div>
                            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50">Prev</button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button key={i} onClick={() => setPage(i + 1)} className={`px-2 py-1 text-sm rounded-md ${page === i + 1 ? 'bg-gray-900 text-white' : 'bg-white border'}`}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}