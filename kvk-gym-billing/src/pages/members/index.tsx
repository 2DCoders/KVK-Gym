import { Plus, Search, MoreVertical } from 'lucide-react';

export default function Members() {
  const patients = [
    { id: 1, name: 'Janidu Samarakoon', pid: 'PAT-20260321-001', age: '36 yrs', gender: 'Male', phone: '+94783445678', nic: '923314172V', visits: 3, lastVisit: '23 Mar 2026' },
    { id: 2, name: 'Mahanama N/A', pid: 'PAT-20260324-002', age: '0 yrs', gender: 'Male', phone: '+94714589632', nic: '—', visits: 0, lastVisit: '' },
    { id: 3, name: 'Doe N/A', pid: 'PAT-20260324-001', age: '3 yrs', gender: 'Male', phone: '+94716523546', nic: '923314175V', visits: 0, lastVisit: '' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-2xl font-bold text-gray-900">Member Registration</h1>
            <p className="text-sm text-gray-500 mt-1">Search for returning members or register a new one</p>
          </div>
            <div className="w-full max-w-lg">
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm">
                <Search size={18} className="text-gray-400" />
                <input className="w-full outline-none text-sm" placeholder="Search by name, phone, NIC, or member ID..." />
              </div>
            </div>

          <div className="flex items-center gap-3">
            <button className="flex justify-center w-full items-center gap-2 px-4 py-2 text-white rounded-md bg-blue-700 transition">
              <Plus size={16} />
              New Member
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="text-sm font-medium text-gray-900 flex items-center gap-2">All Members <span className="ml-1 inline-flex items-center justify-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{patients.length}</span></button>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b border-gray-100">
                    <th className="py-3 px-4">MEMBER</th>
                    <th className="py-3 px-4">AGE</th>
                    <th className="py-3 px-4">GENDER</th>
                    <th className="py-3 px-4">PHONE</th>
                    <th className="py-3 px-4">NIC</th>
                    <th className="py-3 px-4">VISITS</th>
                    <th className="py-3 px-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">{p.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                          <div>
                            <div className="font-medium text-gray-900">{p.name}</div>
                            <div className="text-xs text-blue-600">{p.pid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{p.age}</td>
                      <td className="py-4 px-4"><span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{p.gender}</span></td>
                      <td className="py-4 px-4 text-gray-700">{p.phone}</td>
                      <td className="py-4 px-4 text-gray-700">{p.nic}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{p.visits}</div>
                        {p.lastVisit && <div className="text-xs text-gray-400">{p.lastVisit}</div>}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
