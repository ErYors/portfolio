const variants = {
  primary:
    'bg-amber-400 text-slate-900 border border-transparent hover:bg-amber-500',
  secondary:
    'bg-white text-slate-900 border border-slate-900 hover:bg-slate-50',
};

export default function Button({
  variant = 'primary',
  as: Tag = 'button',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex rounded-md px-4 py-2 text-sm font-medium shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
