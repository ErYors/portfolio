import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa'

const CONFIG = {
  success: { Icon: FaCheckCircle, className: 'bg-green-600 text-white' },
  error: { Icon: FaExclamationCircle, className: 'bg-red-600 text-white' },
  info: { Icon: FaInfoCircle, className: 'bg-slate-700 text-white' },
}

export default function Toast({ type, message }) {
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
