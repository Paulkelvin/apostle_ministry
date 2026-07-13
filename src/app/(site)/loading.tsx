
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-warm-100 border-t-accent rounded-full animate-spin" />
        <p className="text-primary font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

