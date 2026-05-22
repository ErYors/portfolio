const variants = {
  primary: 'bg-yellow text-ink border border-transparent hover:opacity-90',
  secondary: 'bg-white text-ink border border-ink hover:bg-slate-50',
}

export default function Button({
  variant = 'primary',
  as: Tag = 'button',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex rounded-lg px-6 py-2 font-button text-lg font-medium leading-[1.5] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const safeProps =
    Tag === 'button' && props.type === undefined
      ? { type: 'button', ...props }
      : props

  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...safeProps}>
      {children}
    </Tag>
  )
}
