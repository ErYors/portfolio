import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:erwan.godelle@efrei.net', label: 'Email' },
]

export default function Footer({ name = 'Madelyn Torff', year = 2021 }) {
  return (
    <footer id="contact" className="py-12">
      <ul className="flex justify-center gap-6">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className="text-slate-900 transition-colors hover:text-slate-500"
            >
              <Icon size={28} />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-slate-500">
        {name} {year}
      </p>
    </footer>
  )
}
