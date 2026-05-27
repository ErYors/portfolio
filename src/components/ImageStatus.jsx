import {
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
} from 'react-icons/fa'

const CONFIG = {
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
    textClass: 'text-green-600 dark:text-green-400',
  },
  invalid: {
    Icon: FaExclamationCircle,
    iconClass: '',
    text: 'URL invalide ou image inaccessible',
    textClass: 'text-orange-600 dark:text-orange-400',
  },
}

export default function ImageStatus({ status }) {
  if (status === 'idle') return null

  const { Icon, iconClass, text, textClass } = CONFIG[status]

  return (
    <p className={`flex items-center gap-2 font-body text-sm ${textClass}`}>
      <Icon className={iconClass} size={14} />
      {text}
    </p>
  )
}
