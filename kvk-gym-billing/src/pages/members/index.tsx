import { useState } from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';

export default function Members() {
  const members = [
    { id: 1, name: 'Janidu Samarakoon', pid: 'GYM-MEM-20260001', age: '36 yrs', gender: 'Male', phone: '+94783445678', nic: '923314172V' },
    { id: 2, name: 'Mahanama N/A', pid: 'GYM-MEM-20260002', age: '0 yrs', gender: 'Male', phone: '+94714589632', nic: '—' },
    { id: 3, name: 'Doe N/A', pid: 'GYM-MEM-20260003', age: '3 yrs', gender: 'Male', phone: '+94716523546', nic: '923314175V' },
  ];

  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = members.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = members.slice(start, start + pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Member Registration</h1>
            <p className="text-sm text-gray-500 mt-1">Search for returning members or register a new one</p>
          </div>
            <div className="w-full max-w-md">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm shadow-sm">
                <Search size={16} className="text-gray-400" />
                <input className="w-full outline-none text-sm" placeholder="Search by name, phone, NIC, or member ID..." />
              </div>
            </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white rounded cursor-pointer bg-blue-700 transition text-sm">
              <Plus size={14} />
              New Member
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3 py-0.5">
              <div className="text-sm font-medium text-gray-900 flex items-center gap-2">All Members <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{total}</span></div>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                    <th className="py-2 px-3">MEMBER</th>
                    <th className="py-2 px-3">AGE</th>
                    <th className="py-2 px-3">GENDER</th>
                    <th className="py-2 px-3">PHONE</th>
                    <th className="py-2 px-3">NIC</th>
                    <th className="py-2 px-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3 align-top">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">{p.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.pid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 align-top text-gray-700">{p.age}</td>
                      <td className="py-2 px-3 align-top"><span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{p.gender}</span></td>
                      <td className="py-2 px-3 align-top text-gray-700">{p.phone}</td>
                      <td className="py-2 px-3 align-top text-gray-700">{p.nic}</td>
                      <td className="py-2 px-3 align-top text-gray-500">
                        <button className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"><MoreVertical size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {start + 1} to {Math.min(start + pageSize, total)} of {total} entries</div>
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
