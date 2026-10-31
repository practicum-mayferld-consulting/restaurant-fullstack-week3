// MenuItem — renders one dish card from the menuItems data array
// Receives a single item object as prop
export default function MenuItem({ item }) {
  const { name, price, description, tags, pairing, signature } = item

  // Tag colour mapping
  const tagStyle = (tag) => {
    if (tag === 'Vegetarian')  return 'bg-[rgba(122,132,113,0.2)] text-tertiary-DEFAULT border-tertiary-container'
    if (tag === 'Pescatarian') return 'bg-[rgba(255,181,156,0.15)] text-secondary-DEFAULT border-secondary-DEFAULT/30'
    return 'bg-[rgba(122,132,113,0.1)] text-tertiary-DEFAULT border-tertiary-container/50'
  }

  return (
    <article
      className={`group flex flex-col gap-4 p-6 rounded-lg border transition-all duration-300
                  hover:-translate-y-1.5 hover:shadow-2xl
                  ${signature
                    ? 'border-primary-DEFAULT/40 bg-gradient-to-br from-surface-container to-surface-high'
                    : 'border-[rgba(212,163,115,0.15)] bg-surface-container hover:border-[rgba(212,163,115,0.3)]'
                  }`}
    >
      {/* Header: name + price */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="font-display text-lg font-medium text-cream
                         group-hover:text-primary-DEFAULT transition-colors duration-300">
            {name}
          </h3>
          {signature && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5
                             bg-secondary-container/80 text-cream rounded">
              Signature
            </span>
          )}
        </div>
        <span className="font-display text-lg font-medium text-primary-DEFAULT shrink-0">
          ${price}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#d6d0c5] leading-relaxed">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5
                        rounded border transition-transform duration-200 hover:scale-105 ${tagStyle(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Wine pairing — reveals slightly on hover */}
      <div className="flex items-center gap-2 text-xs text-muted italic
                      opacity-60 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                      transition-all duration-300">
        <span>🍷</span>
        <span>{pairing}</span>
      </div>
    </article>
  )
}
