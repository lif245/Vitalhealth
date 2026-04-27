import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import { Moon, Star, Clock, Lightbulb, ChevronRight, Save } from 'lucide-react'

const tips = [
  { icon: Lightbulb, title: 'ปรับอุณหภูมิห้อง', desc: 'ห้องที่เย็นประมาณ 18-22°C ช่วยให้นอนหลับได้ดีขึ้น' },
  { icon: Lightbulb, title: 'งดหน้าจอก่อนนอน', desc: 'หลีกเลี่ยงการใช้โทรศัพท์อย่างน้อย 30 นาทีก่อนนอน' },
  { icon: Lightbulb, title: 'ลดคาเฟอีน', desc: 'ไม่ควรดื่มกาแฟหลัง 14:00 น. เพื่อการนอนที่ดีขึ้น' },
  { icon: Lightbulb, title: 'ผ่อนคลายก่อนนอน', desc: 'ลองทำสมาธิหรือยืดเส้นเบาๆ 10 นาทีก่อนนอน' },
]

export default function SleepPage() {
  const { showToast } = useToast()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [stars, setStars] = useState(4)
  const [form, setForm] = useState({
    hours: 8.0,
    quality: 'ดี'
  })

  const starLabels = ['', 'แย่', 'พอใช้', 'ปานกลาง', 'ดี', 'ยอดเยี่ยม']

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/sleep')
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
      const res = await fetch('/api/sleep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, quality: starLabels[stars] })
      })
      if (res.ok) {
        showToast('✅ บันทึกการนอนสำเร็จ!')
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
          <Moon className="text-indigo-500" size={32} />
          บันทึกการนอนหลับ
        </h2>
        <p className="text-app-text3 text-[1rem] mt-1 font-sarabun">ติดตามคุณภาพการนอนเพื่อพลังงานที่ดีขึ้นในวันถัดไป</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Log Form */}
        <div className="col-span-5 bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border h-fit">
          <h3 className="text-[1.1rem] font-bold mb-6 font-prompt">จดบันทึกการนอนวันนี้</h3>
          
          <div className="space-y-8">
            <div>
              <label className="block text-[0.9rem] font-bold text-app-text mb-4 font-prompt">จำนวนชั่วโมงที่นอน</label>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: parseFloat(e.target.value) })}
                  className="flex-1 accent-indigo-500 h-2 bg-app-bg rounded-lg appearance-none cursor-pointer"
                />
                <div className="w-20 text-center">
                  <span className="text-[1.6rem] font-bold text-indigo-600 font-prompt">{form.hours}</span>
                  <p className="text-[0.7rem] text-app-text3 font-sarabun">ชั่วโมง</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[0.9rem] font-bold text-app-text mb-4 font-prompt">คุณภาพการนอน</label>
              <div className="flex gap-3 justify-between mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setStars(n)}
                    className={`flex-1 py-3 rounded-2xl border-[1.5px] transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      n <= stars ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-app-border text-app-text3'
                    }`}
                  >
                    <Star size={20} fill={n <= stars ? 'currentColor' : 'none'} />
                    <span className="text-[0.7rem] font-bold font-sarabun">{n}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-[0.85rem] font-bold text-indigo-600 font-sarabun mt-2">ระดับ: {starLabels[stars]}</p>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-prompt font-bold text-white text-[1.05rem] border-none cursor-pointer shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
            >
              <div className="flex items-center justify-center gap-2">
                <Save size={20} />
                {loading ? 'กำลังบันทึก...' : 'บันทึกการนอน'}
              </div>
            </button>
          </div>
        </div>

        {/* Tips & History */}
        <div className="col-span-7 space-y-8">
          {/* History */}
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-6 font-prompt">ประวัติการนอนล่าสุด</h3>
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="text-center py-10 text-app-text3 font-sarabun opacity-50">ยังไม่มีประวัติการนอน</div>
              ) : (
                logs.slice(0, 3).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-app-bg rounded-2xl border border-app-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Moon size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-[1rem] font-prompt text-app-text">{log.hours} ชั่วโมง</div>
                        <div className="text-[0.8rem] text-app-text3 font-sarabun">{new Date(log.created_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[0.8rem] font-bold font-sarabun">
                      {log.quality}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-6 font-prompt">เคล็ดลับการนอนที่ดี</h3>
            <div className="grid grid-cols-2 gap-4">
              {tips.map((tip, i) => (
                <div key={i} className="p-4 rounded-2xl bg-app-bg border border-app-border hover:border-indigo-200 transition-all cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-3 shadow-sm">
                    <tip.icon size={18} className="text-indigo-500" />
                  </div>
                  <h4 className="text-[0.9rem] font-bold text-app-text font-prompt mb-1">{tip.title}</h4>
                  <p className="text-[0.75rem] text-app-text3 font-sarabun leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
