import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const navItems = [
  { id: 'home', label: 'หน้าหลัก' },
  { id: 'exercise', label: 'ออกกำลังกาย' },
  { id: 'food', label: 'การกิน' },
  { id: 'sleep', label: 'การนอน' },
  { id: 'settings', label: 'ตั้งค่า' },
]

export default function Header({ activePage, setActivePage }) {
  const { user, logout } = useAuth()
  const { showToast } = useToast()

  const handleLogout = () => {
    logout()
    showToast('ออกจากระบบแล้ว')
  }

  return (
    <header className="bg-white border-b-[1.5px] border-app-border sticky top-0 z-50" style={{ boxShadow: '0 2px 16px rgba(13,110,79,0.07)' }}>
      <div className="max-w-[1100px] mx-auto px-7 flex items-center justify-between h-[66px]">
        {/* Logo */}
        <a className="flex items-center gap-2.5 no-underline cursor-pointer" onClick={() => setActivePage('home')}>
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-deep"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="text-sm font-medium text-green-deep font-sarabun truncate max-w-[150px]">{user.email || user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-[0.85rem] font-sarabun font-medium text-app-text2 hover:bg-red-50 hover:text-red-600 transition-all border-none cursor-pointer"
              >
                ออกจากระบบ
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
