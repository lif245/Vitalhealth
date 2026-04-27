import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { Settings, User, Target, Bell, Save, ChevronRight } from 'lucide-react'

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div
      onClick={() => setOn(!on)}
      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${on ? 'bg-green-mid' : 'bg-app-border'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${on ? 'left-7' : 'left-1'}`} />
    </div>
  )
}

export default function SettingsPage() {
  const { showToast } = useToast()

  const notifications = [
    { label: 'แจ้งเตือนออกกำลังกาย', sub: 'ทุกวัน 06:00 น.', on: true },
    { label: 'แจ้งเตือนบันทึกอาหาร', sub: 'หลังมื้ออาหาร', on: true },
    { label: 'แจ้งเตือนเวลานอน', sub: 'ทุกคืน 22:00 น.', on: true },
    { label: 'สรุปรายสัปดาห์', sub: 'ทุกวันอาทิตย์', on: false },
    { label: 'แจ้งเตือนดื่มน้ำ', sub: 'ทุก 2 ชั่วโมง', on: true },
  ]

  return (
    <div className="py-9">
      <div className="mb-8">
        <h2 className="text-[1.8rem] font-bold font-prompt text-app-text flex items-center gap-3">
          <Settings className="text-gray-600" size={32} />
          ตั้งค่า
        </h2>
        <p className="text-app-text3 text-[1rem] mt-1 font-sarabun">ปรับแต่งโปรไฟล์และเป้าหมายสุขภาพส่วนตัว</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Personal & Goals */}
        <div className="col-span-7 space-y-8">
          {/* Profile */}
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-6 font-prompt flex items-center gap-2">
              <User size={20} className="text-green-mid" />
              ข้อมูลโปรไฟล์
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'อายุ', val: 28, unit: 'ปี' },
                { label: 'เพศ', val: 'ชาย', type: 'select', options: ['ชาย', 'หญิง', 'อื่น'] },
                { label: 'น้ำหนักปัจจุบัน', val: 65, unit: 'กก.' },
                { label: 'ส่วนสูง', val: 170, unit: 'ซม.' },
              ].map((r, i) => (
                <div key={i}>
                  <label className="block text-[0.85rem] font-bold text-app-text3 mb-2 font-sarabun uppercase tracking-wider">{r.label}</label>
                  {r.type === 'select' ? (
                    <select className="w-full px-4 py-3 bg-app-bg border-[1.5px] border-app-border rounded-xl font-sarabun focus:bg-white focus:border-green-mid outline-none">
                      {r.options.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <div className="relative">
                      <input type="number" defaultValue={r.val} className="w-full px-4 py-3 bg-app-bg border-[1.5px] border-app-border rounded-xl font-sarabun focus:bg-white focus:border-green-mid outline-none" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-app-text3 font-sarabun">{r.unit}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-6 font-prompt flex items-center gap-2">
              <Target size={20} className="text-green-mid" />
              เป้าหมายสุขภาพ
            </h3>
            <div className="space-y-4">
              {[
                { label: 'เป้าหมายก้าวเดิน', val: 10000, unit: 'ก้าวต่อวัน' },
                { label: 'เป้าหมายแคลอรี', val: 2000, unit: 'kcal ต่อวัน' },
                { label: 'เป้าหมายการนอน', val: 8, unit: 'ชั่วโมงต่อวัน' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-app-bg rounded-2xl border border-app-border">
                  <span className="font-bold text-app-text font-prompt text-[0.95rem]">{r.label}</span>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue={r.val} className="w-24 px-3 py-2 text-center bg-white border border-app-border rounded-lg font-sarabun focus:border-green-mid outline-none" />
                    <span className="text-[0.8rem] text-app-text3 font-sarabun w-20">{r.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => showToast('✅ บันทึกการตั้งค่าสำเร็จ!')}
              className="w-full mt-8 py-4 rounded-2xl font-prompt font-bold text-white text-[1.05rem] border-none cursor-pointer shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
            >
              <div className="flex items-center justify-center gap-2">
                <Save size={20} />
                บันทึกการเปลี่ยนแปลง
              </div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-span-5">
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-6 font-prompt flex items-center gap-2">
              <Bell size={20} className="text-green-mid" />
              การแจ้งเตือน
            </h3>
            <div className="space-y-6">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div>
                    <div className="text-[1rem] font-bold font-prompt text-app-text group-hover:text-green-deep transition-colors">{n.label}</div>
                    <div className="text-[0.8rem] text-app-text3 font-sarabun">{n.sub}</div>
                  </div>
                  <Toggle defaultOn={n.on} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-6 rounded-3xl bg-green-pale border border-green-mid/20 text-center">
            <p className="text-[0.85rem] text-green-deep font-sarabun leading-relaxed mb-4">
              ข้อมูลของคุณจะถูกเก็บเป็นความลับและนำไปใช้เพื่อคำนวณโภชนาการที่เหมาะสมเท่านั้น
            </p>
            <button className="text-sm font-bold text-green-mid font-prompt hover:underline flex items-center justify-center gap-1 mx-auto">
              อ่านนโยบายความเป็นส่วนตัว <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
