import { CheckSquare, Search, Filter, Calendar } from 'lucide-react';

export default function Attendance() {
  const attendanceRecords = [
    { id: 1, member: 'John Doe', date: '2024-05-15', time: '06:30 AM', status: 'Present' },
    { id: 2, member: 'Jane Smith', date: '2024-05-15', time: '07:15 AM', status: 'Present' },
    { id: 3, member: 'Mike Johnson', date: '2024-05-15', time: '08:45 AM', status: 'Late' },
    { id: 4, member: 'Sarah Williams', date: '2024-05-15', time: '-', status: 'Absent' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Attendance</h2>
        <p className="text-gray-600 mt-1">Track member attendance records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Present</p>
          <p className="text-3xl font-bold text-emerald-600">87%</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Late</p>
          <p className="text-3xl font-bold text-orange-600">8%</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Absent</p>
          <p className="text-3xl font-bold text-red-600">5%</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Visits</p>
          <p className="text-3xl font-bold text-blue-600">1,247</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-xs bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search member..." className="bg-transparent outline-none w-full" />
        </div>
        <div className="flex-1 min-w-xs bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <input type="date" className="bg-transparent outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-light-gray rounded-lg hover:bg-gray-300 transition-all duration-200">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-light-gray">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Member</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Check-in Time</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">{record.member}</td>
                <td className="py-4 px-6 text-gray-600">{record.date}</td>
                <td className="py-4 px-6 text-gray-600">{record.time}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                    record.status === 'Late' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {record.status}
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
