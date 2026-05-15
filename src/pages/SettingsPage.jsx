import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { useHealthStore } from '../store/useHealthStore'
import PageTransition from '../components/PageTransition'

export default function SettingsPage() {
  const { showToast } = useToast()
  const { resetData, isDarkMode, toggleDarkMode, notificationSettings: notifs, updateNotificationSettings } = useHealthStore()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [themeColor, setThemeColor] = useState('#16a97a')

  const [goals, setGoals] = useState({
    steps: 10000,
    calories: 2000,
    sleep: 8,
    targetWeight: 60
  })

  // Notification settings are now managed by Zustand store

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      showToast('บันทึกการตั้งค่าเรียบร้อยแล้ว!')
      setLoading(false)
    }, 800)
  }

  // 2. ฟังก์ชันส่งการแจ้งเตือนจริง (Actual Browser Notification)
  const sendActualNotification = (title, message) => {
    if (!("Notification" in window)) {
      showToast('เบราว์เซอร์นี้ไม่รองรับการแจ้งเตือน', 'error')
      return
    }

    if (Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico' // สามารถเปลี่ยนเป็นไอคอนของแอปได้
      })
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, {
            body: message,
            icon: '/favicon.ico'
          })
        }
      })
    }
  }

  const toggleNotif = (key, label) => {
    const newState = !notifs[key].active
    updateNotificationSettings(key, { active: newState })
    
    // ถ้าผู้ใช้กด "เปิด" ให้ส่งการแจ้งเตือนจริงไปทดสอบ
    if (newState) {
      sendActualNotification(
        `เปิดการแจ้งเตือน ${label} สำเร็จ`,
        `Vitalhealth จะแจ้งเตือนคุณตามเวลาที่กำหนดไว้ครับ`
      )
      showToast(`เปิดการแจ้งเตือน ${label} แล้ว (Browser Notification)`, 'success')
    }
  }

  const updateTime = (key, time) => {
    updateNotificationSettings(key, { time })
  }

  const handleReset = () => {
    if (window.confirm('คุณต้องการล้างข้อมูลสุขภาพทั้งหมดใช่หรือไม่?')) {
      resetData()
      showToast('ล้างข้อมูลเรียบร้อยแล้ว')
    }
  }

  const Toggle = ({ active, onToggle }) => (
    <button 
      onClick={onToggle} 
      className={`w-[52px] h-[28px] rounded-full relative transition-all duration-300 focus:outline-none shadow-inner ${active ? '' : 'bg-[#e0f2f1]'}`}
      style={{ backgroundColor: active ? themeColor : undefined }}
    >
      <div className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-sm transition-transform duration-300 ${active ? 'translate-x-[27px]' : 'translate-x-[3px]'}`} />
    </button>
  )

  const TimePicker = ({ value, onChange, label }) => (
    <div className="flex items-center gap-1.5 text-[0.75rem] text-app-text3 font-sarabun mt-1">
      <span>{label}</span>
      <div className="relative group">
        <input 
          type="time" 
          value={value} 
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" 
        />
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-app-bg border border-app-border group-hover:border-green-mid transition-all shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="font-bold text-[0.85rem]" style={{ color: themeColor }}>{value}</span>
          <span className="text-[0.7rem] opacity-70">น.</span>
        </div>
      </div>
    </div>
  )

  const colors = [
    { name: 'Green', hex: '#16a97a' },
    { name: 'Blue', hex: '#0891b2' },
    { name: 'Purple', hex: '#8b5cf6' },
    { name: 'Rose', hex: '#f43f5e' },
    { name: 'Orange', hex: '#f59e0b' },
  ]

  return (
    <PageTransition>
    <div className="py-9">
      <div className="mb-7">
        <h2 className="text-[1.6rem] font-bold font-prompt text-app-text">ตั้งค่า</h2>
        <p className="text-app-text3 text-[0.95rem] mt-1 font-sarabun">ปรับแต่งหน้าตาและระบบแจ้งเตือนของคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.05rem] font-semibold mb-6 flex items-center gap-2 font-prompt text-green-deep">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 12V4"/><path d="M12 12l4 4"/></svg>
              ธีมและสีสัน
            </h3>
            <div className="flex gap-4 mb-4">
              {colors.map(c => (
                <button
                  key={c.hex}
                  onClick={() => setThemeColor(c.hex)}
                  className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${themeColor === c.hex ? 'border-white ring-2 ring-offset-2 ring-gray-300' : 'border-transparent'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-app-border">
              <div>
                <div className="text-[0.9rem] font-medium text-app-text font-sarabun">โหมดกลางคืน (Dark Mode)</div>
                <div className="text-[0.75rem] text-app-text3 font-sarabun mt-1">ถนอมสายตาในที่มืด</div>
              </div>
              <Toggle active={isDarkMode} onToggle={toggleDarkMode} />
            </div>
          </div>

          <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.05rem] font-semibold mb-6 flex items-center gap-2 font-prompt text-green-deep">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              เป้าหมายสุขภาพ
            </h3>
            <div className="space-y-5">
              {[
                { label: 'ก้าวเดินต่อวัน', val: goals.steps, unit: 'ก้าว', key: 'steps' },
                { label: 'แคลอรีต่อวัน', val: goals.calories, unit: 'kcal', key: 'calories' },
                { label: 'เวลานอนต่อวัน', val: goals.sleep, unit: 'ชม.', key: 'sleep' },
                { label: 'น้ำหนักเป้าหมาย', val: goals.targetWeight, unit: 'กก.', key: 'targetWeight' },
              ].map(f => (
                <div key={f.key} className="flex items-center justify-between">
                  <label className="text-[0.9rem] text-app-text2 font-sarabun">{f.label}</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={f.val} onChange={e => setGoals({...goals, [f.key]: e.target.value})}
                      className="w-24 px-3 py-1.5 border border-app-border rounded-app-sm text-center font-sarabun text-[0.9rem] focus:border-green-mid outline-none" />
                    <span className="text-[0.85rem] text-app-text3 w-10 font-sarabun">{f.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleSave} disabled={loading}
              className="w-full mt-8 py-3.5 rounded-app-sm font-prompt font-semibold text-white text-[1rem] transition-all hover:opacity-95 shadow-md"
              style={{ backgroundColor: themeColor }}
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่าทั้งหมด'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border h-fit">
          <h3 className="text-[1.05rem] font-semibold mb-6 flex items-center gap-2 font-prompt text-green-deep border-b border-app-bg2 pb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            การแจ้งเตือน
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.9rem] font-medium text-app-text font-sarabun">แจ้งเตือนออกกำลังกาย</div>
                <TimePicker label="ทุกวัน" value={notifs.exercise.time} onChange={e => updateTime('exercise', e.target.value)} />
              </div>
              <Toggle active={notifs.exercise.active} onToggle={() => toggleNotif('exercise', 'ออกกำลังกาย')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.9rem] font-medium text-app-text font-sarabun">แจ้งเตือนบันทึกอาหาร</div>
                <div className="text-[0.75rem] text-app-text3 font-sarabun mt-1">หลังมื้ออาหาร (แจ้งเตือนทุกวัน)</div>
              </div>
              <Toggle active={notifs.food.active} onToggle={() => toggleNotif('food', 'บันทึกอาหาร')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.9rem] font-medium text-app-text font-sarabun">แจ้งเตือนเวลานอน</div>
                <TimePicker label="ทุกคืน" value={notifs.sleep.time} onChange={e => updateTime('sleep', e.target.value)} />
              </div>
              <Toggle active={notifs.sleep.active} onToggle={() => toggleNotif('sleep', 'เวลานอน')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.9rem] font-medium text-app-text font-sarabun">แจ้งเตือนดื่มน้ำ</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[0.75rem] text-app-text3 font-sarabun">ทุกๆ:</span>
                  <select value={notifs.water.interval} onChange={e => updateNotificationSettings('water', { interval: e.target.value })}
                    className="bg-app-bg border border-app-border rounded-full px-2 py-0.5 text-[0.8rem] font-bold outline-none cursor-pointer" style={{ color: themeColor }}>
                    <option value="1">1 ชั่วโมง</option>
                    <option value="2">2 ชั่วโมง</option>
                    <option value="3">3 ชั่วโมง</option>
                  </select>
                </div>
              </div>
              <Toggle active={notifs.water.active} onToggle={() => toggleNotif('water', 'ดื่มน้ำ')} />
            </div>

            <div className="pt-6 border-t border-app-bg2 flex justify-between items-center">
              <button onClick={handleReset} className="text-red-500 text-[0.8rem] font-sarabun hover:underline opacity-70 hover:opacity-100 transition-opacity">ล้างข้อมูลสุขภาพทั้งหมด</button>
              <div className="flex items-center gap-2">
                <span className="text-[0.75rem] text-app-text3 font-sarabun">แจ้งเตือนเมล:</span>
                <button onClick={() => toggleNotif('emailAlert', 'อีเมล')} className={`w-7 h-3.5 rounded-full relative transition-colors ${notifs.emailAlert.active ? '' : 'bg-gray-200'}`} style={{ backgroundColor: notifs.emailAlert.active ? themeColor : undefined }}>
                  <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-transform ${notifs.emailAlert.active ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wearables Connection UI */}
        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border h-fit md:col-span-2">
          <h3 className="text-[1.05rem] font-semibold mb-6 flex items-center gap-2 font-prompt text-green-deep border-b border-app-bg2 pb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            การเชื่อมต่ออุปกรณ์ (Wearables)
          </h3>
          <p className="text-[0.85rem] text-app-text3 font-sarabun mb-4">ซิงค์ข้อมูลก้าวเดินและการนอนจาก Smartwatch ของคุณ (เร็วๆ นี้)</p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 px-5 py-2.5 border border-app-border rounded-app-sm hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Fit" className="w-5 h-5" />
              <span className="font-prompt text-[0.9rem] font-medium text-app-text">Google Fit</span>
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 border border-app-border rounded-app-sm hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              <svg viewBox="0 0 384 512" className="w-5 h-5" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <span className="font-prompt text-[0.9rem] font-medium text-app-text">Apple Health</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
