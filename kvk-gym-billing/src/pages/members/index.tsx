import { Users, Plus, Search, Filter } from 'lucide-react';

export default function Members() {
  const members = [
    { id: 1, name: 'John Doe', phone: '+1 234 567 8900', joinDate: '2024-01-15', plan: 'Premium', status: 'Active' },
    { id: 2, name: 'Jane Smith', phone: '+1 234 567 8901', joinDate: '2024-02-20', plan: 'Standard', status: 'Active' },
    { id: 3, name: 'Mike Johnson', phone: '+1 234 567 8902', joinDate: '2024-03-10', plan: 'Basic', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', phone: '+1 234 567 8903', joinDate: '2024-04-05', plan: 'Premium', status: 'Active' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Members</h2>
          <p className="text-gray-600 mt-1">Manage all gym members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-xs bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search members..." className="bg-transparent outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-light-gray rounded-lg hover:bg-gray-300 transition-all duration-200">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Members Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-light-gray">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Phone</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Join Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Plan</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">{member.name}</td>
                <td className="py-4 px-6 text-gray-600">{member.phone}</td>
                <td className="py-4 px-6 text-gray-600">{member.joinDate}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {member.plan}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
