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
      
    </div>
  );
}
