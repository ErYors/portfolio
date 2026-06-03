import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

const variants = {
  primary: 'bg-yellow text-ink border border-transparent hover:opacity-90',
  secondary: 'bg-surface text-ink border border-ink hover:opacity-90',
  danger: 'bg-error text-white border border-transparent hover:opacity-90',
} as const

const base =
  'inline-flex rounded-lg px-6 py-2 font-button text-lg font-medium leading-[1.5] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

type Variant = keyof typeof variants

type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: Variant
  className?: string
  children?: ReactNode
} & Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'variant' | 'className' | 'children'
>

export default function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = as ?? 'button'
  return (
    <Component
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
