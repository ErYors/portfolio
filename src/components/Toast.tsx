import type { IconType } from 'react-icons'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa'

export type ToastType = 'success' | 'error' | 'info'

const CONFIG: Record<ToastType, { Icon: IconType; className: string }> = {
  success: { Icon: FaCheckCircle, className: 'bg-success text-white' },
  error: { Icon: FaExclamationCircle, className: 'bg-error text-white' },
  info: { Icon: FaInfoCircle, className: 'bg-info text-white' },
}

interface ToastProps {
  type: ToastType
  message: string
}

export default function Toast({ type, message }: ToastProps) {
  const { Icon, className } = CONFIG[type]
  return (
    <div
      role="status"
      className={`pointer-events-auto flex animate-fade-in items-center gap-3 rounded-lg px-4 py-3 font-body text-sm shadow-lg ${className}`}
    >
      <Icon size={18} />
      {message}
    </div>
  )
}
