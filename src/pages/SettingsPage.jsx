import { useState } from 'react'
import { useToast } from '../context/ToastContext'

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div onClick={() => setOn(!on)} className={`toggle-switch ${on ? 'on' : 'off'}`} />
  )
}

export default function SettingsPage() {
  const { showToast } = useToast()
  const [saving, setSaving] = useState(false)

  const notifications = [
    { label: 'แจ้งเตือนออกกำลังกาย', sub: 'ทุกวัน 06:00 น.', on: true },
    { label: 'แจ้งเตือนบันทึกอาหาร', sub: 'หลังมื้ออาหาร', on: true },
    { label: 'แจ้งเตือนเวลานอน', sub: 'ทุกคืน 22:00 น.', on: true },
    { label: 'สรุปรายสัปดาห์', sub: 'ทุกวันอาทิตย์', on: false },
    { label: 'แจ้งเตือนดื่มน้ำ', sub: 'ทุก 2 ชั่วโมง', on: true },
    { label: 'โหมดกลางคืน', sub: 'ลดความสว่างหน้าจอ', on: false },
  ]

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      showToast('บันทึกการตั้งค่าสำเร็จ!')
      setSaving(false)
    }, 800)
  }

  return (
    <div className="py-9">
      <div className="mb-7">
        <h2 className="text-[1.6rem] font-bold font-prompt text-app-text">ตั้งค่า</h2>
        <p className="text-app-text3 text-[0.95rem] mt-1 font-sarabun">ปรับข้อมูลส่วนตัวและเป้าหมายสุขภาพ</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          {/* Personal info */}
          <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1rem] font-semibold text-green-deep mb-4 pb-2 border-b-[1.5px] border-app-border flex items-center gap-2 font-prompt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              ข้อมูลส่วนตัว
            </h3>
            {[
              { label: 'อายุ', val: 28, unit: 'ปี' },
              { label: 'น้ำหนัก', val: 65, unit: 'กก.' },
              { label: 'ส่วนสูง', val: 170, unit: 'ซม.' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-app-bg2 last:border-0">
                <span className="text-[0.92rem] font-medium font-sarabun text-app-text2">{r.label}</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={r.val}
                    className="w-20 px-2.5 py-1.5 text-center border-[1.5px] border-app-border rounded-lg text-[0.9rem] font-sarabun bg-app-bg outline-none focus:border-green-mid transition-all"
                  />
                  <span className="text-[0.85rem] text-app-text3 font-sarabun">{r.unit}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between py-3">
              <span className="text-[0.92rem] font-medium font-sarabun text-app-text2">เพศ</span>
              <select className="px-2.5 py-1.5 border-[1.5px] border-app-border rounded-lg text-[0.9rem] font-sarabun bg-app-bg outline-none focus:border-green-mid cursor-pointer transition-all">
                <option>ชาย</option><option>หญิง</option><option>อื่น</option>
              </select>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1rem] font-semibold text-green-deep mb-4 pb-2 border-b-[1.5px] border-app-border flex items-center gap-2 font-prompt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              เป้าหมายสุขภาพ
            </h3>
            {[
              { label: 'ก้าวเดินต่อวัน', val: 10000, unit: 'ก้าว' },
              { label: 'แคลอรีต่อวัน', val: 2000, unit: 'kcal' },
              { label: 'เวลานอนต่อวัน', val: 8, unit: 'ชม.' },
              { label: 'น้ำหนักเป้าหมาย', val: 60, unit: 'กก.' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-app-bg2 last:border-0">
                <span className="text-[0.92rem] font-medium font-sarabun text-app-text2">{r.label}</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={r.val}
                    className="w-20 px-2.5 py-1.5 text-center border-[1.5px] border-app-border rounded-lg text-[0.9rem] font-sarabun bg-app-bg outline-none focus:border-green-mid transition-all"
                  />
                  <span className="text-[0.85rem] text-app-text3 font-sarabun">{r.unit}</span>
                </div>
              </div>
            ))}
            <button onClick={handleSave} disabled={saving}
              className="w-full mt-4 py-3 rounded-app-sm font-prompt font-semibold text-white text-[1rem] border-none cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px shadow-md disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
            >
              {saving ? 'กำลังบันทึก...' : 'บันทึกเป้าหมาย'}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border h-fit">
          <h3 className="text-[1rem] font-semibold text-green-deep mb-4 pb-2 border-b-[1.5px] border-app-border flex items-center gap-2 font-prompt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            การแจ้งเตือน
          </h3>
          {notifications.map((n, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-app-bg2 last:border-0">
              <div>
                <div className="text-[0.92rem] font-medium font-sarabun text-app-text">{n.label}</div>
                <div className="text-[0.8rem] text-app-text3 mt-0.5 font-sarabun">{n.sub}</div>
              </div>
              <Toggle defaultOn={n.on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
