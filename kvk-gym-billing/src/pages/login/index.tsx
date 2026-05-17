import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', formData)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 h-screen w-screen flex overflow-hidden">
        {/* Left side - Branding section (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start px-12 lg:px-20 overflow-hidden">
          <div className="max-w-md animate-fade-in max-h-screen overflow-y-auto pr-2">
            {/* Logo and title */}
            <div className="mb-12 flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Dumbbell className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">KVK Gym</h1>
                <p className="text-blue-400 font-semibold mt-1">Premium Fitness</p>
              </div>
            </div>

            {/* Hero content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-white leading-tight mb-6">
                  Manage Your Gym Empire
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Streamline member management, billing, and gym operations with our premium admin dashboard.
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Real-time Member Analytics</p>
                    <p className="text-sm text-gray-400 mt-1">Track memberships and engagement</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Automated Billing System</p>
                    <p className="text-sm text-gray-400 mt-1">Secure payment processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Advanced Reporting</p>
                    <p className="text-sm text-gray-400 mt-1">Data-driven insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Trusted by <span className="font-semibold text-white">500+</span> fitness centers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-0 md:px-12 lg:px-20 overflow-hidden">
          <div className="w-full max-w-md animate-slide-up overflow-y-auto max-h-screen md:max-h-none">
            {/* Glassmorphism card */}
            <div className="backdrop-blur-xl bg-slate-800/40 border border-blue-400/20 rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 md:hidden mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Dumbbell className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-lg text-white">KVK Gym</span>
                </div>
                <h2 className="text-3xl md:text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-300 font-medium">
                  Admin Management Portal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* User ID field */}
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-gray-200 font-semibold text-sm">
                    User ID
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="userId"
                      name="userId"
                      type="text"
                      placeholder="Enter your user ID"
                      value={formData.userId}
                      onChange={handleChange}
                      className="pl-10 pr-4 bg-slate-700/30 border border-slate-600/50 rounded-lg focus:bg-slate-700/50 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-gray-500 h-9 text-gray-100"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200 font-semibold text-sm">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 bg-slate-700/30 border border-slate-600/50 rounded-lg focus:bg-slate-700/50 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-gray-500 h-9 text-gray-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot password link */}
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Login button */}
                <Button
                  type="submit"
                  className="w-full h-9 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 group text-sm"
                >
                  <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Sign In
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-slate-600/30 text-center">
                <p className="text-xs text-gray-400">
                  Don't have access?{' '}
                  <a href="#" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                    Contact admin
                  </a>
                </p>
              </div>
            </div>

            {/* Security info */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}