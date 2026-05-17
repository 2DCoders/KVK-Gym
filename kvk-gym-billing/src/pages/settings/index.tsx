import { Settings, Bell, Lock, User, LogOut } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your preferences and account settings</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <User size={24} className="text-primary" />
          <h3 className="text-xl font-bold text-gray-900">Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input type="text" defaultValue="Admin User" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" defaultValue="admin@kvkgym.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" defaultValue="+1 234 567 8900" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={24} className="text-primary" />
          <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', desc: 'Receive email updates' },
            { label: 'Push Notifications', desc: 'Browser push alerts' },
            { label: 'SMS Alerts', desc: 'Critical updates via SMS' },
          ].map((notif, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-light-gray rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{notif.label}</p>
                <p className="text-sm text-gray-600">{notif.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={24} className="text-primary" />
          <h3 className="text-xl font-bold text-gray-900">Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-red-200 shadow-sm">
        <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
        <p className="text-gray-600 text-sm mb-4">These actions are irreversible. Please proceed with caution.</p>
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium flex items-center gap-2">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
