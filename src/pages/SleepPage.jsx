import { useState } from 'react'
import { useToast } from '../context/ToastContext'

const tips = [
  { icon: '🌡️', title: 'ปรับอุณหภูมิห้อง', desc: 'ห้องที่เย็นประมาณ 18-22°C ช่วยให้นอนหลับได้ดีขึ้น' },
  { icon: '📱', title: 'งดหน้าจอก่อนนอน', desc: 'หลีกเลี่ยงการใช้โทรศัพท์อย่างน้อย 30 นาทีก่อนนอน' },
  { icon: '☕', title: 'ลดคาเฟอีน', desc: 'ไม่ควรดื่มกาแฟหลัง 14:00 น. เพื่อการนอนที่ดีขึ้น' },
  { icon: '🧘', title: 'ผ่อนคลายก่อนนอน', desc: 'ลองทำสมาธิหรือยืดเส้นเบาๆ 10 นาทีก่อนนอน' },
  { icon: '🌙', title: 'นอนตรงเวลา', desc: 'วันนี้คุณนอนหลับได้ 7.5 ชม. ขาดไปอีก 30 นาทีจากเป้าหมาย' },
]

export default function SleepPage() {
  const { showToast } = useToast()
  const [sleepStart, setSleepStart] = useState('22:30')
  const [sleepEnd, setSleepEnd] = useState('06:00')
  const [hours, setHours] = useState('7.5')
  const [stars, setStars] = useState(4)

  const calcSleep = (s, e) => {
    if (!s || !e) return
    const [sh, sm] = s.split(':').map(Number)
    const [eh, em] = e.split(':').map(Number)
    let mins = (eh * 60 + em) - (sh * 60 + sm)
    if (mins < 0) mins += 24 * 60
    setHours((mins / 60).toFixed(1))
  }

  const pct = Math.min((parseFloat(hours) / 8) * 100, 100)
  const circumference = 2 * Math.PI * 58
  const offset = circumference - (pct / 100) * circumference

  const starLabels = ['', 'แย่ (1/5)', 'พอใช้ (2/5)', 'ปานกลาง (3/5)', 'ดี (4/5)', 'ยอดเยี่ยม (5/5)']

  return (
    <div className="py-9">
      <div className="mb-7">
        <h2 className="text-[1.6rem] font-bold font-prompt">🌙 บันทึกการนอนหลับ</h2>
        <p className="text-app-text3 text-[0.95rem] mt-1 font-sarabun">ติดตามคุณภาพการนอนเพื่อพลังงานที่ดีขึ้น</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
          <h3 className="text-[1.05rem] font-semibold mb-5 flex items-center gap-2 font-prompt">📝 บันทึกการนอน</h3>
          {/* Ring */}
          <div className="text-center py-5">
            <div className="w-[140px] h-[140px] mx-auto mb-4 relative">
              <svg width="140" height="140" viewBox="0 0 140 140" className="sleep-ring-svg">
                <circle cx="70" cy="70" r="58" fill="none" stroke="#e6f7f0" strokeWidth="14"/>
                <circle cx="70" cy="70" r="58" fill="none" stroke="url(#sleepGrad)" strokeWidth="14"
                  strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s' }}
                />
                <defs>
                  <linearGradient id="sleepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2"/>
                    <stop offset="100%" stopColor="#16a97a"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[1.6rem] font-bold text-green-deep font-prompt">{hours}</span>
                <span className="text-[0.75rem] text-app-text3 font-sarabun">ชั่วโมง</span>
              </div>
            </div>
            <div className="text-[0.85rem] text-app-text3 font-sarabun">เป้าหมาย: 8 ชั่วโมง</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-[18px]">
            {[
              { label: 'เวลานอน', val: sleepStart, set: v => { setSleepStart(v); calcSleep(v, sleepEnd) } },
              { label: 'เวลาตื่น', val: sleepEnd, set: v => { setSleepEnd(v); calcSleep(sleepStart, v) } },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">{f.label}</label>
                <input type="time" value={f.val} onChange={e => f.set(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white"
                />
              </div>
            ))}
          </div>
          <div className="mb-[18px]">
            <label className="block text-[0.88rem] font-medium text-app-text2 mb-2.5 text-center font-sarabun">คุณภาพการนอน</label>
            <div className="flex gap-2 justify-center mb-2">
              {[1,2,3,4,5].map(n => (
                <span key={n} onClick={() => setStars(n)}
                  className={`text-[1.8rem] cursor-pointer transition-transform duration-150 select-none ${n <= stars ? 'star active' : 'star'}`}
                >⭐</span>
              ))}
            </div>
            <div className="text-center text-[0.82rem] text-app-text3 font-sarabun">{starLabels[stars]}</div>
          </div>
          <button onClick={() => showToast('✅ บันทึกการนอนสำเร็จ!')}
            className="w-full py-3 rounded-app-sm font-prompt font-semibold text-white text-[1rem] border-none cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
          >
            💾 บันทึกการนอน
          </button>
        </div>
        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
          <h3 className="text-[1.05rem] font-semibold mb-5 flex items-center gap-2 font-prompt">💡 คำแนะนำการนอน</h3>
          <ul className="list-none">
            {tips.map((t, i) => (
              <li key={i} className={`flex items-start gap-2.5 py-2.5 text-[0.9rem] font-sarabun ${i < tips.length - 1 ? 'border-b border-app-bg2' : ''}`}>
                <span className="text-[1.1rem] flex-shrink-0 mt-0.5">{t.icon}</span>
                <div>
                  <strong>{t.title}</strong>
                  <br />
                  <span className="text-app-text3 text-[0.85rem]">{t.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
