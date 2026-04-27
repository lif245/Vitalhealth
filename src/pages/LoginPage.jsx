import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function LoginPage({ onSuccess }) {
  const { login } = useAuth()
  const { showToast } = useToast()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const ok = login(username.trim(), password)
      if (ok) {
        showToast('✅ เข้าสู่ระบบสำเร็จ!')
        onSuccess()
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen login-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-60px] w-80 h-80 rounded-full bg-white/8 pointer-events-none" />
      <div className="absolute top-1/2 left-[-120px] w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-app-lg border border-white/30">
          💚
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold font-prompt tracking-wide">Vitalhealth</h1>
          <p className="text-white/70 text-sm font-sarabun mt-1">ดูแลสุขภาพทุกวันกับเรา</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-app shadow-app-lg overflow-hidden">
        {/* Card header */}
        <div className="bg-gradient-to-r from-green-deep to-green-mid px-8 py-6">
          <h2 className="text-white text-xl font-bold font-prompt">เข้าสู่ระบบ</h2>
          <p className="text-white/75 text-sm font-sarabun mt-1">ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-app-text2 mb-2 font-sarabun">
              ชื่อผู้ใช้
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text3 text-base">👤</span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="กรอกชื่อผู้ใช้ (user)"
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none transition-all focus:border-green-mid focus:bg-white placeholder:text-app-text3/60"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-app-text2 mb-2 font-sarabun">
              รหัสผ่าน
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text3 text-base">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="กรอกรหัสผ่าน (1234)"
                autoComplete="current-password"
                className="w-full pl-10 pr-12 py-3 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none transition-all focus:border-green-mid focus:bg-white placeholder:text-app-text3/60"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-app-text3 hover:text-green-mid transition-colors"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between text-sm font-sarabun">
            <label className="flex items-center gap-2 text-app-text2 cursor-pointer">
              <input type="checkbox" className="rounded border-app-border text-green-mid" />
              จดจำฉัน
            </label>
            <button type="button" className="text-green-mid hover:text-green-deep transition-colors font-medium">
              ลืมรหัสผ่าน?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-app-sm text-red-600 text-sm font-sarabun">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Hint */}
          <div className="p-3 bg-green-pale rounded-app-sm border border-app-border text-xs text-app-text2 font-sarabun">
            💡 สำหรับทดสอบ: ชื่อผู้ใช้ <strong>user</strong> รหัสผ่าน <strong>1234</strong>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-app-sm font-prompt font-semibold text-white text-[1rem] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                กำลังเข้าสู่ระบบ...
              </span>
            ) : '🔑 เข้าสู่ระบบ'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-app-text3 font-sarabun">
            <div className="flex-1 h-px bg-app-border" />
            หรือเข้าสู่ระบบด้วย
            <div className="flex-1 h-px bg-app-border" />
          </div>

          {/* Social buttons (UI only) */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border-[1.5px] border-app-border rounded-app-sm text-sm text-app-text2 font-sarabun hover:bg-app-bg2 transition-colors">
              <span className="text-base">🌐</span> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border-[1.5px] border-app-border rounded-app-sm text-sm text-app-text2 font-sarabun hover:bg-app-bg2 transition-colors">
              <span className="text-base">📘</span> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-app-text3 font-sarabun">
            ยังไม่มีบัญชี?{' '}
            <button type="button" className="text-green-mid hover:text-green-deep font-medium transition-colors">
              สมัครสมาชิกฟรี
            </button>
          </p>
        </form>
      </div>

      <p className="mt-6 text-white/50 text-xs font-sarabun">© 2025 Vitalhealth · สงวนลิขสิทธิ์</p>
    </div>
  )
}
