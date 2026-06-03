import type { IconType } from 'react-icons'
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import footerWave from '@/assets/footer-wave.png'

interface SocialLink {
  icon: IconType
  href: string
  label: string
}

const socialLinks: SocialLink[] = [
  { icon: FaInstagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:erwan.godelle@efrei.net', label: 'Email' },
]

interface FooterProps {
  name?: string
  year?: number
}

export default function Footer({
  name = 'Madelyn Torff',
  year = 2021,
}: FooterProps) {
  return (
    <footer className="relative pt-12">
      <img src={footerWave} alt="" className="block w-full" />

      <div className="absolute inset-x-0 top-12 flex flex-col items-center gap-8">
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
      </div>
    </footer>
  )
}
