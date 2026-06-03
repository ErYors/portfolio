import type { IconType } from 'react-icons'
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa'

export type ImageStatus = 'idle' | 'loading' | 'valid' | 'invalid'

interface StatusConfig {
  Icon: IconType
  iconClass: string
  text: string
  textClass: string
}

const CONFIG: Record<Exclude<ImageStatus, 'idle'>, StatusConfig> = {
  loading: {
    Icon: FaSpinner,
    iconClass: 'animate-spin',
    text: 'Vérification…',
    textClass: 'text-muted',
  },
  valid: {
    Icon: FaCheckCircle,
    iconClass: '',
    text: 'Image valide',
    textClass: 'text-success',
  },
  invalid: {
    Icon: FaExclamationCircle,
    iconClass: '',
    text: 'URL invalide ou image inaccessible',
    textClass: 'text-error',
  },
}

export default function ImageStatus({ status }: { status: ImageStatus }) {
  if (status === 'idle') return null

  const { Icon, iconClass, text, textClass } = CONFIG[status]

  return (
    <p className={`flex items-center gap-2 font-body text-sm ${textClass}`}>
      <Icon className={iconClass} size={14} />
      {text}
    </p>
  )
}
