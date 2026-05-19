import { Lock } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {

    const cashier = localStorage.getItem('cashier') ? JSON.parse(localStorage.getItem('cashier') as string) : null;
    const [fullName, setFullName] = useState(cashier ? cashier.firstName + ' ' + cashier.lastName : 'Admin User');
    const [email, setEmail] = useState(cashier ? cashier.email : 'admin@kvkgym.com');


    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your account, preferences and security</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Left column - Profile & Notifications */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex gap-6">

                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1.5">Full name</label>
                                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} readOnly className="w-full px-3 py-1 border rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1.5">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} readOnly className="w-full px-3 py-1 border rounded-md" />
                                    </div>
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
                                    <label className="block text-sm text-gray-700 mb-1.5">Current password</label>
                                    <input type="password" className="w-full px-3 py-1 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1.5">New password</label>
                                    <input type="password" className="w-full px-3 py-1 border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Confirm password</label>
                                <input type="password" className="w-full px-3 py-1 border rounded-md" />
                            </div>
                            <div className="flex justify-end">
                                <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Update password</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
