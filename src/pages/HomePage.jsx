export default function HomePage({ setActivePage }) {
  return (
    <div className="py-9">
      {/* Hero */}
      <div
        className="rounded-app p-12 text-white relative overflow-hidden mb-8"
        style={{ background: 'linear-gradient(135deg, #0d6e4f 0%, #16a97a 55%, #0891b2 100%)' }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/8 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-20 w-44 h-44 rounded-full bg-white/6 pointer-events-none" />
        <p className="text-[1rem] opacity-80 mb-1.5 font-sarabun">👋 สวัสดีตอนเช้า, คุณผู้ใช้</p>
        <h1 className="text-[2rem] font-bold mb-2.5 font-prompt">วันนี้พร้อมดูแลสุขภาพ<br />ของคุณแล้วหรือยัง?</h1>
        <p className="text-[1rem] opacity-85 mb-7 font-sarabun">ติดตามทุกกิจกรรมสุขภาพในที่เดียว เพื่อชีวิตที่ดีกว่า</p>
        <button
          onClick={() => setActivePage('exercise')}
          className="inline-flex items-center gap-2 bg-white text-green-deep px-7 py-3.5 rounded-full font-prompt text-[1rem] font-semibold border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
          ✨ เริ่มบันทึกวันนี้!
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-[18px] mb-8">
        {[
          { icon: '👟', val: '7,842', label: 'จำนวนก้าว', pct: 78, bar: 'linear-gradient(90deg, #16a97a, #22d6a0)' },
          { icon: '🔥', val: '412', label: 'แคลอรีที่เผาผลาญ', pct: 55, bar: 'linear-gradient(90deg, #ff6b6b, #ffd166)' },
          { icon: '😴', val: '7.5', label: 'ชั่วโมงนอนหลับ', pct: 93, bar: 'linear-gradient(90deg, #0891b2, #67e8f9)' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-app p-6 shadow-app border-[1.5px] border-app-border text-center transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-app-lg">
            <div className="text-[2.2rem] mb-2.5">{s.icon}</div>
            <div className="text-[2rem] font-bold text-green-deep font-prompt">{s.val}</div>
            <div className="text-[0.88rem] text-app-text3 mt-0.5 font-sarabun">{s.label}</div>
            <div className="h-1.5 bg-app-bg2 rounded-full mt-3">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.pct}%`, background: s.bar }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <p className="text-[1.1rem] font-semibold text-app-text mb-4 font-prompt">⚡ เริ่มบันทึกด่วน</p>
      <div className="grid grid-cols-4 gap-3.5">
        {[
          { icon: '🏋️', label: 'บันทึกออกกำลังกาย', page: 'exercise' },
          { icon: '🍽️', label: 'บันทึกมื้ออาหาร', page: 'food' },
          { icon: '🌙', label: 'บันทึกการนอน', page: 'sleep' },
          { icon: '🎯', label: 'ตั้งเป้าหมาย', page: 'settings' },
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => setActivePage(q.page)}
            className="bg-white rounded-app-sm p-[18px_14px] text-center border-[1.5px] border-app-border cursor-pointer transition-all duration-150 hover:bg-green-pale hover:border-green-mid font-sarabun"
            style={{ boxShadow: '0 2px 8px rgba(13,110,79,0.06)' }}
          >
            <div className="text-[1.8rem] mb-2">{q.icon}</div>
            <div className="text-[0.82rem] font-medium text-app-text2">{q.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
