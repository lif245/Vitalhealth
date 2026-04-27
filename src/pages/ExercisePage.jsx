import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import { Activity, Clock, Flame, History, Plus, ChevronRight } from 'lucide-react'

const activityTypes = [
  { id: 'running', label: 'วิ่ง', icon: '🏃', color: '#16a97a' },
  { id: 'cycling', label: 'ปั่นจักรยาน', icon: '🚲', color: '#0891b2' },
  { id: 'walking', label: 'เดิน', icon: '🚶', color: '#f59e0b' },
  { id: 'swimming', label: 'ว่ายน้ำ', icon: '🏊', color: '#0ea5e9' },
  { id: 'gym', label: 'เข้ายิม', icon: '🏋️', color: '#6366f1' },
  { id: 'yoga', label: 'โยคะ', icon: '🧘', color: '#d946ef' },
]

export default function ExercisePage() {
  const { showToast } = useToast()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: 'วิ่ง',
    duration: 30,
    calories: 250
  })

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/exercise')
      const data = await res.json()
      if (Array.isArray(data)) setLogs(data)
    } catch (err) {
      console.error('Failed to fetch logs:', err)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        showToast('✅ บันทึกการออกกำลังกายสำเร็จ!')
        fetchLogs()
      }
    } catch (err) {
      showToast('❌ เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-9">
      <div className="mb-8">
        <h2 className="text-[1.8rem] font-bold font-prompt text-app-text flex items-center gap-3">
          <Activity className="text-green-mid" size={32} />
          บันทึกการออกกำลังกาย
        </h2>
        <p className="text-app-text3 text-[1rem] mt-1 font-sarabun">ติดตามความก้าวหน้าและพลังงานที่ใช้ไป</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="col-span-5 bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border h-fit">
          <h3 className="text-[1.1rem] font-bold mb-6 font-prompt flex items-center gap-2">
            <Plus size={20} className="text-green-mid" />
            บันทึกกิจกรรมใหม่
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[0.9rem] font-bold text-app-text mb-2.5 font-prompt">เลือกประเภทกิจกรรม</label>
              <div className="grid grid-cols-3 gap-2.5">
                {activityTypes.map(act => (
                  <button
                    key={act.id}
                    onClick={() => setForm({ ...form, type: act.label })}
                    className={`p-3 rounded-2xl border-[1.5px] transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      form.type === act.label
                        ? 'bg-green-pale border-green-mid text-green-deep ring-2 ring-green-mid/20'
                        : 'bg-white border-app-border text-app-text2 hover:border-green-mid/30 hover:bg-app-bg'
                    }`}
                  >
                    <span className="text-xl">{act.icon}</span>
                    <span className="text-[0.8rem] font-bold font-sarabun">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.9rem] font-bold text-app-text mb-2.5 font-prompt">ระยะเวลา (นาที)</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text3" size={18} />
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0, calories: (parseInt(e.target.value) || 0) * 8 })}
                    className="w-full pl-10 pr-4 py-3 bg-app-bg border-[1.5px] border-app-border rounded-xl font-sarabun focus:bg-white focus:border-green-mid outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[0.9rem] font-bold text-app-text mb-2.5 font-prompt">แคลอรี (kcal)</label>
                <div className="relative">
                  <Flame className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text3" size={18} />
                  <input
                    type="number"
                    value={form.calories}
                    onChange={(e) => setForm({ ...form, calories: parseInt(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-3 bg-app-bg border-[1.5px] border-app-border rounded-xl font-sarabun focus:bg-white focus:border-green-mid outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-prompt font-bold text-white text-[1.05rem] border-none cursor-pointer shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
            >
              {loading ? 'กำลังบันทึก...' : '💾 บันทึกกิจกรรม'}
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="col-span-7 bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[1.1rem] font-bold font-prompt flex items-center gap-2">
              <History size={20} className="text-green-mid" />
              ประวัติล่าสุด
            </h3>
            <button className="text-sm font-bold text-green-mid font-sarabun hover:underline">ดูทั้งหมด</button>
          </div>

          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="text-center py-12 text-app-text3 font-sarabun opacity-60">
                ยังไม่มีประวัติการออกกำลังกายในวันนี้
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="group flex items-center justify-between p-4 bg-app-bg rounded-2xl border-[1.5px] border-transparent hover:border-green-mid/20 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-pale flex items-center justify-center text-xl">
                      {activityTypes.find(a => a.label === log.type)?.icon || '💪'}
                    </div>
                    <div>
                      <div className="font-bold text-[1rem] font-prompt text-app-text">{log.type}</div>
                      <div className="text-[0.85rem] text-app-text3 font-sarabun flex items-center gap-2">
                        <Clock size={14} /> {log.duration} นาที • {new Date(log.created_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-[1.1rem] text-green-deep font-prompt">{log.calories} <span className="text-[0.8rem] opacity-70">kcal</span></div>
                    </div>
                    <ChevronRight size={18} className="text-app-text3 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
