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
        <p className="text-[1rem] opacity-80 mb-1.5 font-sarabun">สวัสดีตอนเช้า, คุณผู้ใช้</p>
        <h1 className="text-[2rem] font-bold mb-2.5 font-prompt">วันนี้พร้อมดูแลสุขภาพ<br />ของคุณแล้วหรือยัง?</h1>
        <p className="text-[1rem] opacity-85 mb-7 font-sarabun">ติดตามทุกกิจกรรมสุขภาพในที่เดียว เพื่อชีวิตที่ดีกว่า</p>
        <button
          onClick={() => setActivePage('exercise')}
          className="inline-flex items-center gap-2 bg-white text-green-deep px-7 py-3.5 rounded-full font-prompt text-[1rem] font-semibold border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
          เริ่มบันทึกวันนี้!
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-[18px] mb-8">
        {[
          { 
            icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v-2.35c0-1.17.69-2.21 1.75-2.65L12 8l6.25 3c1.06.44 1.75 1.48 1.75 2.65V16"/><path d="M4 16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2"/><path d="M12 8V4"/><path d="M8 4h8"/></svg>, 
            val: '7,842', label: 'จำนวนก้าว', pct: 78, bar: 'linear-gradient(90deg, #16a97a, #22d6a0)' 
          },
          { 
            icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.292 1.5-3a2.5 2.5 0 0 0 2 2.5z"/></svg>, 
            val: '412', label: 'แคลอรีที่เผาผลาญ', pct: 55, bar: 'linear-gradient(90deg, #ff6b6b, #ffd166)' 
          },
          { 
            icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>, 
            val: '7.5', label: 'ชั่วโมงนอนหลับ', pct: 93, bar: 'linear-gradient(90deg, #0891b2, #67e8f9)' 
          },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-app p-6 shadow-app border-[1.5px] border-app-border text-center transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-app-lg">
            <div className="text-green-mid flex justify-center mb-2.5">{s.icon}</div>
            <div className="text-[2rem] font-bold text-green-deep font-prompt">{s.val}</div>
            <div className="text-[0.88rem] text-app-text3 mt-0.5 font-sarabun">{s.label}</div>
            <div className="h-1.5 bg-app-bg2 rounded-full mt-3">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.pct}%`, background: s.bar }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <p className="text-[1.1rem] font-semibold text-app-text mb-4 font-prompt">เริ่มบันทึกด่วน</p>
      <div className="grid grid-cols-4 gap-3.5">
        {[
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 .5-1.5"/><path d="M14 18l.5-1.5"/><path d="M18 14l.5-1.5"/><path d="m22 18-1.5.5"/><path d="m18 14-1.5.5"/><path d="m14 10-1.5.5"/><path d="M2 6l1.5-.5"/><path d="M6 10l1.5-.5"/><path d="M10 14l1.5-.5"/><path d="m6 2-.5 1.5"/><path d="m10 6-.5 1.5"/><path d="m14 10-.5 1.5"/></svg>, label: 'บันทึกออกกำลังกาย', page: 'exercise' },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v11"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>, label: 'บันทึกมื้ออาหาร', page: 'food' },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>, label: 'บันทึกการนอน', page: 'sleep' },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, label: 'ตั้งเป้าหมาย', page: 'settings' },
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => setActivePage(q.page)}
            className="bg-white rounded-app-sm p-[18px_14px] text-center border-[1.5px] border-app-border cursor-pointer transition-all duration-150 hover:bg-green-pale hover:border-green-mid font-sarabun group"
            style={{ boxShadow: '0 2px 8px rgba(13,110,79,0.06)' }}
          >
            <div className="text-green-mid flex justify-center mb-2 transition-transform group-hover:scale-110">{q.icon}</div>
            <div className="text-[0.82rem] font-medium text-app-text2">{q.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
