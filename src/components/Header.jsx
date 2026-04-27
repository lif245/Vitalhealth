import { Home, Activity, Utensils, Moon, Settings, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const navItems = [
  { id: 'home', label: 'หน้าหลัก', icon: Home },
  { id: 'exercise', label: 'ออกกำลังกาย', icon: Activity },
  { id: 'food', label: 'การกิน', icon: Utensils },
  { id: 'sleep', label: 'การนอน', icon: Moon },
  { id: 'settings', label: 'ตั้งค่า', icon: Settings },
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
        <a className="flex items-center gap-2.5 no-underline cursor-pointer group" onClick={() => setActivePage('home')}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}>
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[1.3rem] font-bold text-green-deep font-prompt tracking-tight">Vitalhealth</span>
        </a>

        {/* Nav */}
        <nav className="flex gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-sarabun text-[0.9rem] font-medium transition-all duration-150 border-none cursor-pointer ${
                activePage === item.id
                  ? 'bg-green-pale text-green-deep font-semibold shadow-sm'
                  : 'bg-transparent text-app-text2 hover:bg-green-pale hover:text-green-deep'
              }`}
            >
              <item.icon size={17} strokeWidth={activePage === item.id ? 2.5 : 2} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-2">
          {user && (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-app-bg rounded-lg border border-app-border">
                <User size={15} className="text-app-text3" />
                <span className="text-sm font-medium text-app-text font-sarabun">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-app-text3 hover:bg-red-50 hover:text-red-600 transition-all border-none cursor-pointer"
                title="ออกจากระบบ"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
