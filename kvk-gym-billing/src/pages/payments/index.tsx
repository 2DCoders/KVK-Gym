import { CreditCard, Plus, Search, Download, Filter } from 'lucide-react';

export default function Payments() {
  const payments = [
    { id: 1, member: 'John Doe', amount: '$99.99', date: '2024-05-15', method: 'Card', status: 'Completed' },
    { id: 2, member: 'Jane Smith', amount: '$149.99', date: '2024-05-14', method: 'Bank Transfer', status: 'Completed' },
    { id: 3, member: 'Mike Johnson', amount: '$79.99', date: '2024-05-13', method: 'Card', status: 'Pending' },
    { id: 4, member: 'Sarah Williams', amount: '$99.99', date: '2024-05-12', method: 'Card', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payments</h2>
          <p className="text-gray-600 mt-1">Manage payment records</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">$42,560</p>
          <p className="text-xs text-emerald-600 mt-2">+12% this month</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Completed</p>
          <p className="text-3xl font-bold text-gray-900">342</p>
          <p className="text-xs text-gray-500 mt-2">transactions</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Pending</p>
          <p className="text-3xl font-bold text-gray-900">28</p>
          <p className="text-xs text-orange-600 mt-2">awaiting approval</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-xs bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search payments..." className="bg-transparent outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-light-gray rounded-lg hover:bg-gray-300 transition-all duration-200">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-light-gray">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Member</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Method</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">{payment.member}</td>
                <td className="py-4 px-6 font-semibold text-gray-900">{payment.amount}</td>
                <td className="py-4 px-6 text-gray-600">{payment.date}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {payment.method}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    payment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {payment.status}
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
