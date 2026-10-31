// About / Philosophy section — CSS Grid layout
const purveyors = [
  { name: 'Green String Farm',    detail: 'Petaluma · Heirloom root vegetables & winter greens' },
  { name: 'Stemple Creek Ranch',  detail: 'Tomales Bay · 100% Grass-fed regeneratively raised beef' },
  { name: 'Bodega Bay Foragers',  detail: 'Sonoma Coast · Hand-gathered sea kelp & urchin' },
  { name: 'Bellwether Farms',     detail: 'Valley Ford · Whole-milk sheep ricotta & cultured butter' },
]

const stats = [
  { value: '45d',  label: 'Dry-Aged Cuts' },
  { value: '24',   label: 'Micro-Farms'  },
  { value: '350+', label: 'Cellar Labels' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface-low overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-primary-DEFAULT mb-3">
            Our Philosophy
          </h2>
          <p className="text-[#d4c4b7] italic text-lg">Rooted in Soil, Elevated by Passion</p>
        </div>

        {/* Two-column grid: chef + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Chef profile */}
          <div className="flex flex-col items-center text-center p-8 rounded-lg
                          border border-[rgba(212,163,115,0.15)] bg-surface-container group">
            <div className="w-24 h-24 rounded-full border-2 border-[rgba(212,163,115,0.3)]
                            bg-surface-high flex items-center justify-center text-5xl mb-5
                            group-hover:scale-105 group-hover:shadow-[0_0_0_3px_rgba(212,163,115,0.4)]
                            transition-all duration-400">
              👩‍🍳
            </div>
            <h3 className="font-display text-xl font-medium text-primary-DEFAULT mb-1">
              Chef Elena Rossi
            </h3>
            <p className="text-sm text-[#d4c4b7] mb-1">Executive Chef & Culinary Director</p>
            <p className="text-xs text-muted italic">Ex-Le Gabriel, Paris</p>
          </div>

          {/* Philosophy text + stats */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Terroir statement */}
            <div className="p-6 rounded-lg border border-[rgba(212,163,115,0.15)] bg-surface-container">
              <h4 className="text-sm font-semibold text-cream mb-2">🌱 Terroir First</h4>
              <p className="text-sm text-[#d6d0c5] leading-relaxed">
                100% Organically sourced through daily harvests from 24 regenerative farms
                across Sonoma and the Napa benchlands.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded border border-[rgba(212,163,115,0.15)]
                             bg-surface-high hover:-translate-y-1 hover:border-primary-DEFAULT/40
                             transition-all duration-300"
                >
                  <span className="block font-display text-2xl font-medium text-primary-DEFAULT mb-1">
                    {value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            "At Savoria, cooking is not performance—it is communion. We celebrate the tension between classic French rigor and California's wild coastal bounty. Each day begins with baskets brought directly from Sebastopol soil and concludes beside our open white-oak hearth.",
            "Our kitchen rejects industrial shortcuts. Sauces simmer undisturbed for thirty-six hours; butter is cultured in-house with sea salts hand-harvested along Big Sur. Here, dining returns to its purest form: unhurried, multisensory, and profound.",
          ].map((text, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-[rgba(212,163,115,0.15)] bg-surface-container"
            >
              <p className="text-sm text-[#d6d0c5] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Chef quote */}
        <blockquote className="text-center p-8 sm:p-12 rounded-lg border border-[rgba(212,163,115,0.28)]
                               bg-surface-high mb-14">
          <p className="font-display text-xl sm:text-2xl font-normal italic text-cream leading-relaxed mb-6">
            "True culinary luxury isn't excess—it is the reverence for pure, unadulterated
            ingredients treated with absolute devotion."
          </p>
          <cite className="not-italic">
            <strong className="block text-sm font-semibold text-cream">Elena Rossi</strong>
            <span className="text-xs text-muted">San Francisco Chronicle Chef of the Year 2023</span>
          </cite>
        </blockquote>

        {/* Purveyors */}
        <div>
          <h3 className="font-display text-2xl text-primary-DEFAULT text-center mb-8">
            🌾 Our Regenerative Purveyors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {purveyors.map(({ name, detail }) => (
              <div
                key={name}
                className="p-5 rounded border border-[rgba(212,163,115,0.15)] bg-surface-container
                           hover:border-[rgba(212,163,115,0.3)] hover:translate-x-1.5
                           hover:bg-surface-high transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-primary-DEFAULT mb-1">{name}</h4>
                <p className="text-xs text-[#d4c4b7] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
