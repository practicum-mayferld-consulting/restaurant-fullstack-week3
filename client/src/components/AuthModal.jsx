import { useState } from 'react'

// AuthModal — handles both signup and login in one modal
// Props: onClose (fn), onAuthSuccess (fn — called with user object on success)
export default function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login')  // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('') // clear error on input change
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send/receive the session cookie
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }

      onAuthSuccess(data.user)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `w-full px-4 py-3 rounded border border-[rgba(249,246,240,0.12)]
    bg-[#171717] text-cream text-sm placeholder-muted
    focus:outline-none focus:border-primary-DEFAULT focus:shadow-[0_0_0_3px_rgba(212,163,115,0.15)]
    transition-all duration-300`

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="w-full max-w-md bg-surface-container border border-[rgba(212,163,115,0.2)]
                   rounded-lg p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-medium text-primary-DEFAULT">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-muted mt-1">
              {mode === 'login'
                ? 'Sign in to manage your reservations.'
                : 'Join Savoria for faster bookings.'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-cream transition-colors text-xl mt-1"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name — only for signup */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="auth-name" className="block text-sm font-semibold text-cream mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                id="auth-name"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Elena Rossi"
                className={inputClass}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="auth-email" className="block text-sm font-semibold text-cream mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="auth-email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="auth-password" className="block text-sm font-semibold text-cream mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="auth-password"
              name="password"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
              className={inputClass}
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20
                          rounded px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold text-sm text-[#131313]
                       bg-primary-container hover:bg-primary-DEFAULT
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 hover:-translate-y-0.5
                       hover:shadow-xl hover:shadow-[rgba(212,163,115,0.25)]"
          >
            {loading
              ? 'Please wait…'
              : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle mode */}
        <p className="text-center text-sm text-muted mt-5">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            className="text-primary-DEFAULT hover:text-cream transition-colors font-medium"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
