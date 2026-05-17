import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Dumbbell, CreditCard } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Members',
      value: '1,234',
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Trainers',
      value: '42',
      change: '+5%',
      isPositive: true,
      icon: Dumbbell,
      color: 'from-emerald-600 to-emerald-400',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Monthly Revenue',
      value: '$42,560',
      change: '+8.2%',
      isPositive: true,
      icon: CreditCard,
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Attendance Rate',
      value: '87%',
      change: '+2.1%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-orange-600 to-orange-400',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-05-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-05-14', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-05-13', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', joinDate: '2024-05-12', status: 'Active' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-blue-200/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {stat.isPositive ? (
                  <ArrowUpRight size={16} className="text-emerald-500" />
                ) : (
                  <ArrowDownRight size={16} className="text-red-500" />
                )}
                <span className={stat.isPositive ? 'text-emerald-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
            <p className="text-sm text-gray-500">Monthly revenue trend</p>
          </div>
          <div className="h-64 flex items-end justify-around gap-2">
            {[45, 60, 50, 75, 65, 80, 70, 85, 90, 75, 88, 92].map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-blue-400 rounded-t-lg hover:shadow-lg transition-all duration-200 group cursor-pointer"
                style={{
                  height: `${value}%`,
                  opacity: 0.6 + (value / 100) * 0.4,
                }}
              >
                <div className="invisible group-hover:visible absolute bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap -mt-8">
                  {value}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Distribution */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Attendance</h3>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Present', value: 87, color: 'from-emerald-500 to-emerald-400' },
              { label: 'Absent', value: 8, color: 'from-red-500 to-red-400' },
              { label: 'Late', value: 5, color: 'from-orange-500 to-orange-400' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Members Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Members</h3>
          <p className="text-sm text-gray-500">Latest member registrations</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-100 hover:bg-light-gray transition-colors duration-200"
                >
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{member.name}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{member.joinDate}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        member.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
