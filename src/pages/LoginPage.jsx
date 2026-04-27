import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { User, Lock, Eye, EyeOff, Loader2, Activity } from 'lucide-react'

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
        showToast('เข้าสู่ระบบสำเร็จ')
        onSuccess()
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-mesh">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-green-mid/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-premium flex items-center justify-center text-green-mid mb-4 border border-green-mid/10">
            <Activity size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-[2.2rem] font-bold font-prompt text-app-text tracking-tight mb-1">Vitalhealth</h1>
          <p className="text-app-text3 font-sarabun text-[1rem]">เริ่มต้นดูแลสุขภาพของคุณตั้งแต่วันนี้</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[32px] p-10 shadow-premium border border-white/50 backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="text-[1.3rem] font-bold font-prompt text-app-text mb-2">เข้าสู่ระบบ</h2>
            <div className="h-1 w-12 bg-green-mid rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[0.85rem] font-bold text-app-text3 font-prompt uppercase tracking-wider ml-1">ชื่อผู้ใช้</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-app-text3" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-4 bg-app-bg border-[1.5px] border-app-border rounded-2xl font-sarabun text-[1rem] outline-none transition-all focus:border-green-mid focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.85rem] font-bold text-app-text3 font-prompt uppercase tracking-wider ml-1">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-app-text3" size={18} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-4 bg-app-bg border-[1.5px] border-app-border rounded-2xl font-sarabun text-[1rem] outline-none transition-all focus:border-green-mid focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-app-text3 hover:text-green-mid"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[0.85rem] font-sarabun flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-prompt font-bold text-white text-[1.1rem] transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'เข้าสู่ระบบ'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[0.9rem] text-app-text3 font-sarabun">
              ยังไม่มีบัญชี? <button className="text-green-mid font-bold hover:underline">สมัครสมาชิกฟรี</button>
            </p>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="mt-8 p-4 bg-green-mid/5 rounded-2xl border border-green-mid/10 text-center">
          <p className="text-[0.8rem] text-green-deep font-sarabun">
            ทดสอบระบบ: ใช้ <strong>user</strong> และรหัสผ่าน <strong>1234</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
