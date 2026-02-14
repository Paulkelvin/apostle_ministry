import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg',
        secondary:
          'border-2 border-primary text-primary bg-transparent hover:bg-[#E6D8C8] focus:ring-primary',
        outline:
          'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
        ghost:
          'text-primary hover:bg-primary/10 focus:ring-primary',
        accent:
          'bg-accent text-warm-900 hover:bg-accent-dark focus:ring-accent shadow-md hover:shadow-lg',
        white:
          'bg-white text-warm-900 hover:bg-warm-100 focus:ring-white shadow-md',
      },
      size: {
        sm: 'text-sm px-4 py-2 rounded-lg',
        md: 'text-base px-6 py-3 rounded-lg',
        lg: 'text-lg px-8 py-4 rounded-xl',
        xl: 'text-xl px-10 py-5 rounded-full',
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
