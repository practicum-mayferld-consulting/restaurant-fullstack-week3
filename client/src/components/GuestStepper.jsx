// GuestStepper — controlled component, same pattern as QuantityStepper
// Props: value (number), onChange (function), min, max
// Parent owns the state; this component only renders and calls onChange
export default function GuestStepper({ value, onChange, min = 1, max = 12 }) {
  return (
    <div className="flex items-center gap-3">

      {/* Decrement button */}
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Remove one guest"
        className="w-9 h-9 rounded border border-[rgba(212,163,115,0.28)] text-cream
                   flex items-center justify-center text-lg font-bold
                   hover:bg-[rgba(212,163,115,0.12)] hover:border-primary-DEFAULT
                   disabled:opacity-30 disabled:cursor-not-allowed
                   transition-all duration-200 hover:scale-110 active:scale-95"
      >
        −
      </button>

      {/* Display */}
      <span className="min-w-[2.5rem] text-center font-semibold text-cream text-base">
        {value} {value === 1 ? 'Guest' : 'Guests'}
      </span>

      {/* Increment button */}
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Add one guest"
        className="w-9 h-9 rounded border border-[rgba(212,163,115,0.28)] text-cream
                   flex items-center justify-center text-lg font-bold
                   hover:bg-[rgba(212,163,115,0.12)] hover:border-primary-DEFAULT
                   disabled:opacity-30 disabled:cursor-not-allowed
                   transition-all duration-200 hover:scale-110 active:scale-95"
      >
        +
      </button>
    </div>
  )
}
