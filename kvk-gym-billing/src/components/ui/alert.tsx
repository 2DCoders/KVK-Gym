import * as React from 'react'
import { CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react'

export type AlertVariant = 'success' | 'error' | 'warning' | 'info'

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  description?: React.ReactNode
  dismissible?: boolean
  onClose?: () => void
  className?: string
}

const variantStyles: Record<AlertVariant, { bg: string; ring: string; icon: React.ReactNode }> = {
  success: { bg: 'bg-emerald-50 border-emerald-100', ring: 'ring-emerald-200', icon: <CheckCircle className="w-5 h-5 text-emerald-600" /> },
  error: { bg: 'bg-red-50 border-red-100', ring: 'ring-red-200', icon: <XCircle className="w-5 h-5 text-red-600" /> },
  warning: { bg: 'bg-amber-50 border-amber-100', ring: 'ring-amber-200', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> },
  info: { bg: 'bg-blue-50 border-blue-100', ring: 'ring-blue-200', icon: <CheckCircle className="w-5 h-5 text-blue-600" /> },
}

export function Alert({ variant = 'info', title, description, dismissible = true, onClose, className = '' }: AlertProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`w-full max-w-3xl mx-auto rounded-xl border ${styles.bg} ${className}`} role="alert">
      <div className={`relative flex items-start gap-3 p-4 md:p-4`}> 
        <div className="shrink-0 flex items-center justify-center">{styles.icon}</div>

        <div className="min-w-0 flex-1">
          {title && <div className="text-sm font-semibold text-gray-900">{title}</div>}
          {description && <div className="mt-1 text-sm text-gray-600">{description}</div>}
        </div>

        {dismissible && (
          <button
            onClick={onClose}
            aria-label="Close alert"
            className="ml-2 rounded-lg p-2 text-gray-500 hover:bg-white/30 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
