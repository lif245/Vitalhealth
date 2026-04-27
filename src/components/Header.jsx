import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const navItems = [
  { id: 'home', label: '🏠 หน้าหลัก' },
  { id: 'exercise', label: '🏃 ออกกำลังกาย' },
  { id: 'food', label: '🥗 การกิน' },
  { id: 'sleep', label: '🌙 การนอน' },
  { id: 'settings', label: '⚙️ ตั้งค่า' },
]

export default function Header({ activePage, setActivePage }) {
  const { user, logout } = useAuth()
  const { showToast } = useToast()

  const handleLogout = () => {
    logout()
    showToast('👋 ออกจากระบบแล้ว')
  }

  return (
    <header className="bg-white border-b-[1.5px] border-app-border sticky top-0 z-50" style={{ boxShadow: '0 2px 16px rgba(13,110,79,0.07)' }}>
      <div className="max-w-[1100px] mx-auto px-7 flex items-center justify-between h-[66px]">
        {/* Logo */}
        <a className="flex items-center gap-2.5 no-underline cursor-pointer" onClick={() => setActivePage('home')}>
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}>
            💚
          </div>
          <span className="text-[1.3rem] font-bold text-green-deep font-prompt">Vitalhealth</span>
        </a>

        {/* Nav */}
        <nav className="flex gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-4 py-2 rounded-lg font-sarabun text-[0.9rem] font-medium transition-all duration-150 border-none cursor-pointer ${
                activePage === item.id
                  ? 'bg-green-pale text-green-deep font-semibold'
                  : 'bg-transparent text-app-text2 hover:bg-green-pale hover:text-green-deep'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-pale rounded-app-sm border border-app-border">
                <span className="text-sm">👤</span>
                <span className="text-sm font-medium text-green-deep font-sarabun">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-[0.85rem] font-sarabun font-medium text-app-text2 hover:bg-red-50 hover:text-red-600 transition-all border-none cursor-pointer"
              >
                🚪 ออกจากระบบ
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
