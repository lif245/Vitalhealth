import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHealthStore } from '../store/useHealthStore'
import Modal from '../components/Modal'
import LogForm from '../components/LogForm'
import PageTransition from '../components/PageTransition'
import AnimatedCounter from '../components/AnimatedCounter'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function HomePage() {
  const navigate = useNavigate()
  const { steps, caloriesBurned, sleepHours } = useHealthStore()
  const [modalType, setModalType] = useState(null)

  const stats = [
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v-2.35c0-1.17.69-2.21 1.75-2.65L12 8l6.25 3c1.06.44 1.75 1.48 1.75 2.65V16"/><path d="M4 16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2"/><path d="M12 8V4"/><path d="M8 4h8"/></svg>, 
      val: steps.toLocaleString(), label: 'จำนวนก้าว', pct: Math.min((steps / 10000) * 100, 100), bar: 'linear-gradient(90deg, #16a97a, #22d6a0)' 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.292 1.5-3a2.5 2.5 0 0 0 2 2.5z"/></svg>, 
      val: caloriesBurned.toLocaleString(), label: 'แคลอรีที่เผาผลาญ', pct: Math.min((caloriesBurned / 2000) * 100, 100), bar: 'linear-gradient(90deg, #ff6b6b, #ffd166)' 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>, 
      val: sleepHours, label: 'ชั่วโมงนอนหลับ', pct: Math.min((sleepHours / 8) * 100, 100), bar: 'linear-gradient(90deg, #0891b2, #67e8f9)' 
    },
  ]

  return (
    <PageTransition>
      <div className="py-5 md:py-9">
      {/* Hero */}
      <div
        className="rounded-2xl p-6 md:p-12 text-white relative overflow-hidden mb-6"
        style={{ background: 'linear-gradient(135deg, #0d6e4f 0%, #16a97a 55%, #0891b2 100%)' }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/8 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-20 w-44 h-44 rounded-full bg-white/6 pointer-events-none" />
        <p className="text-[0.9rem] md:text-[1rem] opacity-80 mb-1.5 font-sarabun">สวัสดีตอนเช้า, คุณผู้ใช้</p>
        <h1 className="text-[1.5rem] md:text-[2rem] font-bold mb-2 font-prompt leading-tight">วันนี้พร้อมดูแลสุขภาพ<br />ของคุณแล้วหรือยัง?</h1>
        <p className="text-[0.88rem] md:text-[1rem] opacity-85 mb-5 font-sarabun">ติดตามทุกกิจกรรมสุขภาพในที่เดียว</p>
        <button
          onClick={() => navigate('/exercise')}
          className="inline-flex items-center gap-2 bg-white text-green-deep px-5 py-3 rounded-full font-prompt text-[0.95rem] font-semibold border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
          เริ่มบันทึกวันนี้!
        </button>
      </div>

      {/* Stats - horizontal scroll on mobile, 3 cols on desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-[18px] mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {stats.map((s, i) => (
          <div key={i} className="bg-app-bg2 rounded-2xl p-4 md:p-6 shadow-app border-[1.5px] border-app-border text-center transition-transform duration-150 hover:-translate-y-0.5 min-w-[140px] md:min-w-0 flex-shrink-0 md:flex-shrink">
            <div className="text-green-mid flex justify-center mb-2">{s.icon}</div>
            <AnimatedCounter value={s.val} className="text-[1.6rem] md:text-[2rem] font-bold text-green-deep font-prompt block" />
            <div className="text-[0.78rem] md:text-[0.88rem] text-app-text3 mt-0.5 font-sarabun">{s.label}</div>
            <div className="h-1.5 bg-app-bg2 rounded-full mt-2.5">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.pct}%`, background: s.bar }} />
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Calories Bar Chart */}
        <div className="bg-app-bg2 rounded-2xl p-4 md:p-6 shadow-app border-[1.5px] border-app-border">
          <h3 className="text-[0.95rem] md:text-[1.05rem] font-semibold mb-3 font-prompt text-green-deep">แคลอรีที่เผาผลาญรายสัปดาห์</h3>
          <div className="h-[160px] md:h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={[
                { name: 'จ', cal: 1200 }, { name: 'อ', cal: 1800 }, { name: 'พ', cal: 1500 },
                { name: 'พฤ', cal: 2100 }, { name: 'ศ', cal: 1900 }, { name: 'ส', cal: 2400 }, { name: 'อา', cal: 2000 }
              ]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-light)', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'var(--color-border)', opacity: 0.4 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="cal" fill="var(--color-green-mid)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weight Line Chart */}
        <div className="bg-app-bg2 rounded-2xl p-4 md:p-6 shadow-app border-[1.5px] border-app-border">
          <h3 className="text-[0.95rem] md:text-[1.05rem] font-semibold mb-3 font-prompt text-green-deep">แนวโน้มน้ำหนัก</h3>
          <div className="h-[160px] md:h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={[
                { name: 'สัปดาห์ 1', weight: 65.5 }, { name: 'สัปดาห์ 2', weight: 65.0 }, 
                { name: 'สัปดาห์ 3', weight: 64.2 }, { name: 'สัปดาห์ 4', weight: 63.8 }
              ]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-light)', fontSize: 12 }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-light)', fontSize: 12 }} width={30} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="weight" stroke="var(--color-green-deep)" strokeWidth={3} dot={{ fill: 'var(--color-green-deep)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <p className="text-[1rem] md:text-[1.1rem] font-semibold text-app-text mb-3 font-prompt">บันทึกด่วน</p>
      <div className="grid grid-cols-4 gap-2 md:gap-3.5">
        {[
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 .5-1.5"/><path d="M14 18l.5-1.5"/><path d="M18 14l.5-1.5"/><path d="m22 18-1.5.5"/><path d="m18 14-1.5.5"/><path d="m14 10-1.5.5"/><path d="M2 6l1.5-.5"/><path d="M6 10l1.5-.5"/><path d="M10 14l1.5-.5"/><path d="m6 2-.5 1.5"/><path d="m10 6-.5 1.5"/><path d="m14 10-.5 1.5"/></svg>, label: 'ออกกำลัง', action: () => setModalType('exercise') },
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v11"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>, label: 'บันทึกมื้อ', action: () => setModalType('food') },
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>, label: 'บันทึกนอน', action: () => setModalType('sleep') },
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, label: 'เป้าหมาย', action: () => navigate('/settings') },
        ].map((q, i) => (
          <button
            key={i}
            onClick={q.action}
            className="bg-white rounded-xl p-3 md:p-[18px_14px] text-center border-[1.5px] border-app-border cursor-pointer transition-all duration-150 hover:bg-green-pale hover:border-green-mid font-sarabun group active:scale-95"
            style={{ boxShadow: '0 2px 8px rgba(13,110,79,0.06)' }}
          >
            <div className="text-green-mid flex justify-center mb-1.5 md:mb-2 transition-transform group-hover:scale-110">{q.icon}</div>
            <div className="text-[0.72rem] md:text-[0.82rem] font-medium text-app-text2 leading-tight">{q.label}</div>
          </button>
        ))}
      </div>

      <Modal 
        isOpen={!!modalType} 
        onClose={() => setModalType(null)} 
        title={
          modalType === 'exercise' ? 'บันทึกออกกำลังกาย' : 
          modalType === 'food' ? 'บันทึกมื้ออาหาร' : 
          modalType === 'sleep' ? 'บันทึกการนอน' : ''
        }
      >
        {modalType && <LogForm type={modalType} onSuccess={() => setModalType(null)} />}
      </Modal>
    </div>
    </PageTransition>
  )
}
