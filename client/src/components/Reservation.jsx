import { useState } from 'react'
import GuestStepper from './GuestStepper'

// Reservation form — POSTs to the real API
// user prop passed from App so we can pre-fill name/email if logged in
export default function Reservation({ user }) {
  const [form, setForm] = useState({
    name:    user?.name  || '',
    email:   user?.email || '',
    phone:   '',
    date:    '',
    seating: '',
    time:    '',
    notes:   '',
  })
  const [guests, setGuests] = useState(2)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // attach session cookie
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          phone:     form.phone,
          guests,
          date:      form.date,
          time_slot: form.time || null,
          seating:   form.seating || null,
          notes:     form.notes || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Could not submit reservation.')
        return
      }

      setSubmitted(true)
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

  const labelClass = `block text-sm font-semibold text-cream mb-1.5`

  const seatings = [
    'Main Candlelit Dining Room',
    "Chef's Hearth Counter (Open Kitchen View)",
    'Underground Sommelier Vault (Tasting Menu Only)',
    'Heated Glass Conservatory',
  ]

  const times = ['12:00 PM', '1:15 PM', '5:30 PM', '7:00 PM', '8:30 PM', '9:45 PM']

  return (
    <section id="reservation" className="py-24 bg-surface-low overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-primary-DEFAULT mb-3">
            Reserve Your Sanctuary
          </h2>
          <p className="text-[#d4c4b7] italic text-lg mb-2">Secured Table Bookings</p>
          <p className="text-sm text-muted">
            Instant digital confirmation with dedicated dietary and anniversary accommodations.
          </p>
          {/* Inform logged-in users their booking will be saved to their account */}
          {user && (
            <p className="text-xs text-primary-DEFAULT mt-2">
              ✓ Signed in as <strong>{user.name}</strong> — your reservation will be saved to your account.
            </p>
          )}
        </div>

        {submitted ? (
          <div className="text-center p-12 rounded-lg border border-primary-DEFAULT/40
                          bg-surface-container">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-display text-2xl text-cream mb-3">Your Table is Reserved</h3>
            <p className="text-sm text-[#d4c4b7]">
              A concierge confirmation receipt and cellar pre-selection menu have been
              dispatched to your email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface-container border border-[rgba(212,163,115,0.15)]
                       rounded-lg p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

              {/* Full name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input
                  type="text" id="name" name="name" required
                  value={form.name} onChange={handleChange}
                  className={inputClass} placeholder="Elena Rossi"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>Email Address *</label>
                <input
                  type="email" id="email" name="email" required
                  value={form.email} onChange={handleChange}
                  className={inputClass} placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Contact *</label>
                <input
                  type="tel" id="phone" name="phone" required
                  value={form.phone} onChange={handleChange}
                  className={inputClass} placeholder="(800) 555-0000"
                />
              </div>

              {/* Guest Stepper */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Number of Guests</label>
                <GuestStepper value={guests} onChange={setGuests} min={1} max={12} />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className={labelClass}>Reservation Date *</label>
                <input
                  type="date" id="date" name="date" required
                  value={form.date} onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className={labelClass}>Seating Time Slot</label>
                <select
                  id="time" name="time"
                  value={form.time} onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select time</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Seating atmosphere */}
              <div className="sm:col-span-2">
                <label htmlFor="seating" className={labelClass}>Preferred Seating Atmosphere</label>
                <select
                  id="seating" name="seating"
                  value={form.seating} onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select preference</option>
                  {seatings.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelClass}>Dietary Allergies & Occasion Notes</label>
                <textarea
                  id="notes" name="notes" rows={4}
                  value={form.notes} onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Dietary restrictions, special occasions..."
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20
                            rounded px-3 py-2 mb-4">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded font-semibold text-sm text-[#131313]
                         bg-primary-container hover:bg-primary-DEFAULT
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 hover:-translate-y-0.5
                         hover:shadow-xl hover:shadow-[rgba(212,163,115,0.25)]"
            >
              {loading ? 'Submitting…' : '🔒 Confirm Reservation · Instant Confirmation'}
            </button>

            <p className="text-center text-xs text-muted mt-4 leading-relaxed">
              No prepayment required for standard seatings.<br />
              Free cancellation up to 24 hours prior to service.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
