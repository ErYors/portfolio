import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:erwan.godelle@efrei.net', label: 'Email' },
]

export default function Footer({ name = 'Madelyn Torff', year = 2021 }) {
  return (
    <footer
      id="contact"
      className="flex flex-col items-center gap-8 py-12"
    >
      <ul className="flex gap-6">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className="text-ink transition-opacity hover:opacity-70"
            >
              <Icon size={48} />
            </a>
          </li>
        ))}
      </ul>

      <p className="font-body text-base leading-5.5 text-muted">
        {name} {year}
      </p>
    </footer>
  )
}
