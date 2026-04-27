import { useState, useEffect } from 'react'
import { Sparkles, Footprints, Flame, Moon, Activity, Utensils, Target, ChevronRight } from 'lucide-react'

export default function HomePage({ setActivePage }) {
  const [stats, setStats] = useState({
    calories_consumed: 0,
    calories_burned: 0,
    sleep_hours: 0,
    steps: 7842 // Mock steps as we don't have a tracker yet
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(prev => ({ ...prev, ...data }))
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="py-9">
      {/* Hero */}
      <div
        className="rounded-3xl p-12 text-white relative overflow-hidden mb-10 group shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0d6e4f 0%, #16a97a 55%, #0891b2 100%)' }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none group-hover:bg-white/15 transition-all" />
        <div className="absolute bottom-[-80px] right-20 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-[600px]">
          <p className="text-[0.95rem] font-medium opacity-80 mb-2 font-sarabun tracking-wide">สวัสดีตอนเช้า, คุณผู้ใช้</p>
          <h1 className="text-[2.2rem] leading-tight font-bold mb-4 font-prompt">วันนี้พร้อมดูแลสุขภาพ<br />ของคุณแล้วหรือยัง?</h1>
          <p className="text-[1.05rem] opacity-90 mb-8 font-sarabun font-light leading-relaxed">บันทึกกิจกรรมสุขภาพของคุณวันนี้ เพื่อสร้างนิสัยที่ดีในอนาคต</p>
          <button
            onClick={() => setActivePage('exercise')}
            className="inline-flex items-center gap-2.5 bg-white text-green-deep px-8 py-3.5 rounded-full font-prompt text-[1rem] font-bold border-none cursor-pointer transition-all duration-300 hover:bg-green-pale hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            <Sparkles size={18} />
            เริ่มบันทึกวันนี้
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { icon: Footprints, val: stats.steps.toLocaleString(), label: 'จำนวนก้าววันนี้', pct: 78, color: '#16a97a' },
          { icon: Flame, val: stats.calories_burned, label: 'แคลอรีที่เผาผลาญ', pct: 55, color: '#f97316' },
          { icon: Moon, val: stats.sleep_hours, label: 'ชั่วโมงนอนหลับ', pct: 93, color: '#0891b2' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-7 shadow-app border-[1.5px] border-app-border flex flex-col items-center transition-all duration-300 hover:border-green-mid/30 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${s.color}15` }}>
              <s.icon size={24} style={{ color: s.color }} />
            </div>
            <div className="text-[1.8rem] font-bold text-app-text font-prompt leading-none mb-1">{s.val}</div>
            <div className="text-[0.85rem] text-app-text3 font-sarabun font-medium uppercase tracking-wider">{s.label}</div>
            <div className="w-full h-1.5 bg-app-bg2 rounded-full mt-5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[1.2rem] font-bold text-app-text font-prompt">เริ่มบันทึกด่วน</h3>
        <button className="text-[0.85rem] font-semibold text-green-mid font-sarabun flex items-center gap-1 hover:underline">
          ดูทั้งหมด <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: Activity, label: 'ออกกำลังกาย', page: 'exercise', color: '#16a97a' },
          { icon: Utensils, label: 'มื้ออาหาร', page: 'food', color: '#0891b2' },
          { icon: Moon, label: 'การนอน', page: 'sleep', color: '#6366f1' },
          { icon: Target, label: 'เป้าหมาย', page: 'settings', color: '#f59e0b' },
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => setActivePage(q.page)}
            className="group bg-white rounded-2xl p-6 text-center border-[1.5px] border-app-border cursor-pointer transition-all duration-200 hover:bg-app-bg2 hover:border-green-mid/50 shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110" style={{ backgroundColor: `${q.color}10` }}>
              <q.icon size={28} style={{ color: q.color }} />
            </div>
            <div className="text-[0.9rem] font-bold text-app-text2 font-prompt">{q.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
