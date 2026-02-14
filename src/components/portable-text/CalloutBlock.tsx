import { Info, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react'

interface CalloutBlockProps {
  type: 'info' | 'warning' | 'scripture' | 'tip'
  title?: string
  body: string
}

const calloutStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Info,
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-900',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-900',
  },
  scripture: {
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    icon: BookOpen,
    iconColor: 'text-primary',
    titleColor: 'text-primary-dark',
  },
  tip: {
    bg: 'bg-sage/10',
    border: 'border-sage/30',
    icon: Lightbulb,
    iconColor: 'text-sage-dark',
    titleColor: 'text-sage-dark',
  },
}

export function CalloutBlock({ type = 'info', title, body }: CalloutBlockProps) {
  const style = calloutStyles[type]
  const Icon = style.icon

  return (
    <div className={`my-8 p-6 rounded-xl border ${style.bg} ${style.border}`}>
      <div className="flex gap-4">
        <div className={`flex-shrink-0 ${style.iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          {title && (
            <h4 className={`font-bold mb-2 ${style.titleColor}`}>{title}</h4>
          )}
          <p className="text-warm-700 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  )
}
