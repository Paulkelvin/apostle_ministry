interface DividerProps {
  style?: 'line' | 'dots' | 'space'
}

export function Divider({ style = 'line' }: DividerProps) {
  if (style === 'space') {
    return <div className="my-12" aria-hidden="true" />
  }

  if (style === 'dots') {
    return (
      <div className="my-12 flex justify-center items-center gap-3" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-warm-300" />
        <span className="w-2 h-2 rounded-full bg-warm-300" />
        <span className="w-2 h-2 rounded-full bg-warm-300" />
      </div>
    )
  }

  return (
    <hr className="my-12 border-t-2 border-warm-200" />
  )
}
