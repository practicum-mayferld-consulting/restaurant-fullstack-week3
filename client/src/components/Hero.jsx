// Hero section — single H1, primary CTAs
export default function Hero({ onOpenAuth }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center
                 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(19,19,19,0.85) 0%, rgba(28,27,27,0.7) 50%, rgba(32,31,31,0.85) 100%), ' +
          'radial-gradient(ellipse at 30% 40%, rgba(212,163,115,0.08) 0%, transparent 60%), ' +
          'radial-gradient(ellipse at 70% 60%, rgba(200,90,50,0.06) 0%, transparent 60%)',
        backgroundColor: '#131313',
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5
                      bg-primary-DEFAULT blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-5
                      bg-secondary-container blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full">

        {/* Credential badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['EST. 2018', 'MICHELIN SELECTED', 'ARTISANAL BISTRO & CELLAR'].map((badge) => (
            <span
              key={badge}
              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase
                         text-muted border border-[rgba(212,163,115,0.2)] rounded-full
                         px-3 py-1.5 bg-[rgba(19,19,19,0.6)]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h1
          className="font-display font-normal leading-[1.1] tracking-tight text-cream
                     text-4xl sm:text-5xl lg:text-6xl mb-6"
          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
        >
          Crafted Flavors,{' '}
          <em className="italic text-primary-DEFAULT not-italic" style={{ fontStyle: 'italic' }}>
            Unforgettable Moments.
          </em>
        </h1>

        <p className="text-base sm:text-lg text-[#d4c4b7] leading-relaxed max-w-xl mx-auto mb-10">
          An intimate dining sanctuary marrying seasonal French technique with Californian
          coastal vitality. Each plate tells an honest story of terroir, heritage, and
          uncompromising craft.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a
            href="#reservation"
            className="px-8 py-3 font-semibold rounded text-sm text-[#131313]
                       bg-primary-container hover:bg-primary-DEFAULT
                       transition-all duration-300 hover:-translate-y-1
                       hover:shadow-xl hover:shadow-[rgba(212,163,115,0.25)]"
          >
            Reserve Your Table
          </a>
          <a
            href="#menu"
            className="px-8 py-3 font-semibold rounded text-sm text-cream
                       border border-[rgba(212,163,115,0.3)]
                       hover:bg-[rgba(212,163,115,0.08)] hover:border-primary-DEFAULT
                       transition-all duration-300 hover:-translate-y-1"
          >
            Explore Menu
          </a>
          {/* Sign in shortcut */}
          <button
            onClick={onOpenAuth}
            className="px-8 py-3 font-semibold rounded text-sm text-[#d4c4b7]
                       border border-[rgba(212,163,115,0.15)]
                       hover:bg-[rgba(212,163,115,0.05)] hover:border-primary-DEFAULT/50
                       transition-all duration-300 hover:-translate-y-1"
          >
            Member Sign In
          </button>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xl tracking-widest">⭐⭐⭐⭐⭐</span>
          <p className="text-sm text-[#d4c4b7]">
            <strong className="text-primary-DEFAULT font-semibold">4.9 / 5</strong>
            {' '}• 1,200+ Verified Diners • San Francisco
          </p>
        </div>
      </div>

      {/* Bottom seating bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3
                        bg-surface-container border border-[rgba(212,163,115,0.28)]
                        rounded-lg px-5 py-4">
          <p className="text-sm text-[#d4c4b7] text-center sm:text-left">
            🕰️ Tonight's Seating: First Turn 17:30 · Late Seating 21:15
          </p>
          <a
            href="#reservation"
            className="text-sm font-semibold text-secondary-DEFAULT hover:text-cream
                       transition-colors whitespace-nowrap"
          >
            3 Tables Left — Instant Lock →
          </a>
        </div>
      </div>
    </section>
  )
}
