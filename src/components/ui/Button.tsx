import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-lg transition-[background-color,box-shadow,transform,color,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none active:scale-[0.98] active:translate-y-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.06),0_4px_14px_-4px_rgb(107_79_158/0.45)] hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.14),0_2px_4px_rgb(0_0_0/0.08),0_10px_22px_-6px_rgb(107_79_158/0.55)] focus-visible:outline-primary',
        gold:
          'bg-accent text-warm-900 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.35),0_1px_2px_rgb(0_0_0/0.06),0_4px_14px_-4px_rgb(212_175_55/0.5)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.3),0_2px_4px_rgb(0_0_0/0.08),0_10px_22px_-6px_rgb(212_175_55/0.6)] focus-visible:outline-accent',
        outline:
          'border border-warm-200 text-ink hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-primary',
        ghost:
          'text-primary hover:bg-primary/10 hover:-translate-y-0.5 focus-visible:outline-primary',
        inverse:
          'border border-white/30 text-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-white',
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
