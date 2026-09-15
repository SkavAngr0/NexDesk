import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-900">NexDesk</span>
        </header>

        <main className="bg-gray-100 min-h-screen p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout