import { Settings, Bell, Lock, User, LogOut, CreditCard, Moon } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Admin User');
  const [email, setEmail] = useState('admin@kvkgym.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account, preferences and security</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 text-sm bg-white border rounded-md hover:shadow-sm">Help</button>
          <button className="px-3 py-2 text-sm bg-white border rounded-md hover:shadow-sm flex items-center gap-2"><Settings size={14} />JSON</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex gap-6">
              <div className="w-32 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 font-semibold text-lg">AU</div>
                <button className="mt-3 text-sm px-3 py-1 border rounded-md">Change</button>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                    <p className="text-sm text-gray-500">Update your personal information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Full name</label>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-3">
                  <button className="px-4 py-2 border rounded-md">Cancel</button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Save profile</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column - Security, Billing, Danger */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Lock size={20} className="text-gray-700" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-500">Change your password and manage access</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Current password</label>
                  <input type="password" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">New password</label>
                  <input type="password" className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Confirm password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="flex justify-end">
                <button className="px-3 py-2 bg-emerald-600 text-white rounded-md">Update password</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
