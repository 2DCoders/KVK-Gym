import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false,
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
    <div className="min-h-screen bg-gradient-to-br from-off-white via-white to-light-gray relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-100/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-50/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Branding section (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start px-12 lg:px-20">
          <div className="max-w-md animate-fade-in">
            {/* Logo and title */}
            <div className="mb-12 flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Dumbbell className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">KVK Gym</h1>
                <p className="text-primary font-semibold mt-1">Premium Fitness</p>
              </div>
            </div>

            {/* Hero content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Manage Your Gym Empire
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Streamline member management, billing, and gym operations with our premium admin dashboard.
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Real-time Member Analytics</p>
                    <p className="text-sm text-gray-600 mt-1">Track memberships and engagement</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Automated Billing System</p>
                    <p className="text-sm text-gray-600 mt-1">Secure payment processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Advanced Reporting</p>
                    <p className="text-sm text-gray-600 mt-1">Data-driven insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="mt-16 pt-8 border-t border-gray-200/50">
              <p className="text-sm text-gray-600">
                Trusted by <span className="font-semibold text-gray-900">500+</span> fitness centers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:py-0 md:px-12 lg:px-20">
          <div className="w-full max-w-md animate-slide-up">
            {/* Glassmorphism card */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-glass-lg p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 md:hidden mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Dumbbell className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-lg text-gray-900">KVK Gym</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 font-medium">
                  Admin Management Portal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User ID field */}
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-gray-700 font-semibold">
                    User ID
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="userId"
                      name="userId"
                      type="text"
                      placeholder="Enter your user ID"
                      value={formData.userId}
                      onChange={handleChange}
                      className="pl-12 bg-white/50 border-gray-200/50 border-2 rounded-xl focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 h-11 text-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-12 pr-12 bg-white/50 border-gray-200/50 border-2 rounded-xl focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 h-11 text-gray-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <Label htmlFor="rememberMe" className="text-gray-600 cursor-pointer font-medium">
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-primary hover:text-blue-700 font-semibold text-sm transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login button */}
                <Button
                  type="submit"
                  className="w-full h-12 mt-8 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Sign In
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/70 text-gray-500 text-xs font-medium">
                      or
                    </span>
                  </div>
                </div>

                {/* Alternative option */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 border-gray-200/50 border-2 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-primary/30 transition-all"
                >
                  Continue with SSO
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
                <p className="text-sm text-gray-600">
                  Don't have access?{' '}
                  <a href="#" className="text-primary font-semibold hover:text-blue-700 transition-colors">
                    Contact admin
                  </a>
                </p>
              </div>
            </div>

            {/* Security info */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
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