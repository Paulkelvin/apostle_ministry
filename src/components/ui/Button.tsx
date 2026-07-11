import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary',
        gold:
          'bg-accent text-warm-900 hover:bg-accent-dark focus-visible:outline-accent',
        outline:
          'border border-warm-200 text-ink hover:border-primary hover:text-primary focus-visible:outline-primary',
        ghost:
          'text-primary hover:bg-primary/10 focus-visible:outline-primary',
        inverse:
          'border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white',
      },
      size: {
        sm: 'text-sm px-4 py-2',
        md: 'text-base px-6 py-3',
        lg: 'text-lg px-8 py-4',
        xl: 'text-xl px-10 py-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  href?: string
  external?: boolean
}

export function Button({
  children,
  variant,
  size,
  href,
  external,
  className = '',
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
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export { buttonVariants }
