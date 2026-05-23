const variants = {
  primary: 'bg-yellow text-ink border border-transparent hover:opacity-90',
  secondary: 'bg-surface text-ink border border-ink hover:opacity-90',
}

const base =
  'inline-flex rounded-lg px-6 py-2 font-button text-lg font-medium leading-[1.5] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  variant = 'primary',
  as: Tag = 'button',
  type = Tag === 'button' ? 'button' : undefined,
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      type={type}
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  )
}
