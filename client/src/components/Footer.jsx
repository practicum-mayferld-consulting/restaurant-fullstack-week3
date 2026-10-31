// Footer — semantic landmark with address, hours, contact, newsletter
export default function Footer() {
  const hours = [
    { day: 'Wed – Sun Luncheon',       time: '11:30 AM – 2:30 PM' },
    { day: 'Tue – Sun Dinner Service', time: '5:30 PM – 11:00 PM' },
    { day: 'Fri & Sat Cellar Bar',     time: 'Until 1:00 AM'       },
    { day: 'Monday',                   time: 'Cellar / Private Hire' },
  ]

  return (
    <footer id="visit" className="bg-surface-DEFAULT border-t border-[rgba(212,163,115,0.15)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div>
            <h3 className="font-display text-2xl font-medium text-cream mb-3">Savoria</h3>
            <p className="text-sm text-[#d4c4b7] leading-relaxed mb-4">
              An evening sanctuary celebrating tactile culinary artistry, rare biodynamic
              cellar selections, and understated candlelit hospitality.
            </p>
            <div className="flex gap-3 text-xl">
              {['🗺️', '🍷', '🍽️', '✉️'].map((icon) => (
                <span
                  key={icon}
                  className="cursor-default hover:-translate-y-1 hover:scale-125 transition-transform duration-300 inline-block"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {hours.map(({ day, time }) => (
                <li key={day} className="text-sm text-[#d4c4b7]">
                  <span className="block text-cream font-medium">{day}</span>
                  <span className="text-muted">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Location & Inquiries
            </h4>
            <address className="not-italic space-y-3 text-sm text-[#d4c4b7]">
              <p>📍 428 Montgomery Street<br />Financial District, San Francisco, CA 94104</p>
              <p>
                📞{' '}
                <a href="tel:8005553463" className="hover:text-primary-DEFAULT transition-colors">
                  (800) 555-DINE
                </a>
              </p>
              <p>
                ✉️{' '}
                <a href="mailto:concierge@savoriabistro.com" className="hover:text-primary-DEFAULT transition-colors">
                  concierge@savoriabistro.com
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Cellar Dispatch
            </h4>
            <p className="text-sm text-[#d4c4b7] mb-4 leading-relaxed">
              Receive exclusive releases from our private vineyard collections.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 min-w-0 px-3 py-2 text-sm rounded border border-[rgba(249,246,240,0.12)]
                           bg-[#171717] text-cream placeholder-muted
                           focus:outline-none focus:border-primary-DEFAULT transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded bg-primary-container text-[#131313] font-bold text-sm
                           hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-300"
              >
                →
              </button>
            </form>
            <p className="text-xs text-muted mt-2">Discreet quarterly dispatches. No spam.</p>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-[rgba(212,163,115,0.1)] pt-8
                        flex flex-col sm:flex-row justify-between items-center gap-4">
          <nav className="flex flex-wrap gap-4">
            {['Private Dining Charter', 'Wine Allocation List', 'Privacy Policy'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted hover:text-primary-DEFAULT transition-colors
                           relative after:absolute after:bottom-0 after:left-0 after:h-px
                           after:w-0 after:bg-primary-DEFAULT after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {link}
              </a>
            ))}
          </nav>
          <p className="text-xs text-muted">
            © 2025 Savoria Bistro & Cellar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
