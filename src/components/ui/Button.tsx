import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium tracking-tight rounded-xl transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-sm hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-primary',
        gold:
          'bg-accent text-warm-900 font-semibold shadow-sm hover:bg-accent-dark hover:text-white hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-accent',
        outline:
          'border border-warm-200 text-ink bg-white/50 hover:bg-white hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-primary',
        ghost:
          'text-primary hover:bg-primary/10 hover:-translate-y-0.5 focus-visible:outline-primary',
        inverse:
          'border border-white/25 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-white',
      },
      size: {
        sm: 'text-xs px-3.5 py-1.5 rounded-lg',
        md: 'text-sm sm:text-base px-6 py-2.5 sm:py-3 rounded-xl',
        lg: 'text-base sm:text-lg px-8 py-3.5 sm:py-4 rounded-xl',
        xl: 'text-lg px-10 py-4 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  href?: string
  external?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant,
  size,
  href,
  external,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const classes = `${buttonVariants({ variant, size })} ${className}`

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export { buttonVariants }
