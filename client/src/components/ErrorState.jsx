import { AlertTriangle, RefreshCw } from 'lucide-react'

function ErrorState({ message, onRetry }) {
  return (
    <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
      <AlertTriangle className="mx-auto text-red-500 mb-3" size={28} />
      <p className="text-sm text-gray-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState