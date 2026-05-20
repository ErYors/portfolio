const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Header({ name = 'Madelyn Torff' }) {
  return (
    <header className="relative z-10">
      <div className="max-w-300 mx-auto h-14 px-6 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold text-slate-900 tracking-wide">
          {name}
        </a>

        <nav>
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
