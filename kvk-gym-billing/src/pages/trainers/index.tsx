import { Dumbbell, Plus, Search, Filter } from 'lucide-react';

export default function Trainers() {
  const trainers = [
    { id: 1, name: 'Alex Kumar', specialty: 'Strength Training', members: 24, status: 'Available' },
    { id: 2, name: 'Emma Wilson', specialty: 'Yoga & Pilates', members: 18, status: 'Available' },
    { id: 3, name: 'David Chen', specialty: 'Cardio', members: 32, status: 'In Session' },
    { id: 4, name: 'Lisa Anderson', specialty: 'Nutrition', members: 12, status: 'Available' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Trainers</h2>
          <p className="text-gray-600 mt-1">Manage gym trainers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
          <Plus size={20} />
          Add Trainer
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-xs bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search trainers..." className="bg-transparent outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-light-gray rounded-lg hover:bg-gray-300 transition-all duration-200">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold">
                {trainer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{trainer.name}</p>
                <p className="text-xs text-gray-500">{trainer.specialty}</p>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-xl font-bold text-gray-900">{trainer.members}</p>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                trainer.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {trainer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
