import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'

const recipes = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>, bg: '#f0fdf4', name: 'สลัดไก่อบ', kcal: 320, type: 'green' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"/><path d="M12 7v5l3 3"/></svg>, bg: '#fff7ed', name: 'ไข่คนผัก', kcal: 180, type: 'orange' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16s.5-1 2-1 2 1 2 1 .5-1 2-1 2 1 2 1 .5-1 2-1 2 1 2 1 .5-1 2-1 2 1 2 1"/><path d="M7 2a4 4 0 0 1 4 4c0 3-4 6-4 6S3 9 3 6a4 4 0 0 1 4-4Z"/></svg>, bg: '#e0f2fe', name: 'ปลานึ่งซีอิ๊ว', kcal: 210, type: 'blue' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/></svg>, bg: '#fdf4ff', name: 'โอ๊ตมีลผลไม้', kcal: 290, type: 'green' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h12"/><path d="M12 22V6"/><path d="M7 12h10"/></svg>, bg: '#f0fdf4', name: 'ผัดผักรวม', kcal: 150, type: 'green' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M9 10h6"/><path d="M12 7v6"/></svg>, bg: '#fff7ed', name: 'ไก่อบสมุนไพร', kcal: 380, type: 'orange' },
]

const badgeClass = {
  green: 'bg-green-pale text-green-deep',
  orange: 'bg-orange-50 text-orange-700',
  blue: 'bg-sky-100 text-sky-700',
}

const chips = ['ข้าวสวย', 'ไข่ต้ม', 'ไก่อบ', 'สลัด', 'กล้วย', 'โยเกิร์ต']

export default function FoodPage() {
  const { showToast } = useToast()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    kcal: 200,
    amount: 100,
    unit: 'กรัม (g)',
    meal_type: 'มื้อเช้า'
  })

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/food')
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
    if (!form.name) return showToast('กรุณาใส่ชื่ออาหาร')
    setLoading(true)
    try {
      const res = await fetch('/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        showToast('บันทึกมื้ออาหารสำเร็จ!')
        setForm({ ...form, name: '' })
        fetchLogs()
      }
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการบันทึก')
    } finally {
      setLoading(false)
    }
  }

  const selectRecipe = (r) => {
    setForm({
      ...form,
      name: r.name,
      kcal: r.kcal,
      amount: 1,
      unit: 'ชิ้น'
    })
    showToast(`เลือกเมนู: ${r.name}`)
  }

  return (
    <div className="py-9">
      <div className="mb-7">
        <h2 className="text-[1.6rem] font-bold font-prompt">บันทึกการทานอาหาร</h2>
        <p className="text-app-text3 text-[0.95rem] mt-1 font-sarabun">ติดตามโภชนาการและแคลอรีที่รับประทาน</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
          <h3 className="text-[1.05rem] font-semibold mb-5 flex items-center gap-2 font-prompt text-green-deep">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            บันทึกมื้ออาหาร
          </h3>
          <div className="mb-2">
            <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">ค้นหาหรือเลือกอาหาร</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-app-text3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input type="text" placeholder="เช่น ข้าวผัด, สลัด, ไข่ต้ม..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-[18px]">
            {chips.map(c => (
              <button key={c} onClick={() => setForm({ ...form, name: c })} className="px-3.5 py-1 rounded-full bg-green-pale text-green-deep text-[0.82rem] font-medium border-[1.5px] border-app-border cursor-pointer transition-all hover:bg-green-mid hover:text-white hover:border-green-mid font-sarabun">
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-[18px]">
            <div>
              <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">ปริมาณ</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">หน่วย</label>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full px-3.5 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white cursor-pointer transition-all">
                <option>กรัม (g)</option><option>มิลลิลิตร (ml)</option><option>ชิ้น</option><option>ถ้วย</option>
              </select>
            </div>
          </div>
          <div className="mb-[18px]">
            <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">มื้ออาหาร</label>
            <select value={form.meal_type} onChange={(e) => setForm({ ...form, meal_type: e.target.value })}
                className="w-full px-3.5 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white cursor-pointer transition-all">
              <option>มื้อเช้า</option><option>มื้อกลางวัน</option><option>มื้อเย็น</option><option>ของว่าง</option>
            </select>
          </div>
          <button onClick={handleSave} disabled={loading}
            className="w-full py-3 rounded-app-sm font-prompt font-semibold text-white text-[1rem] border-none cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px mb-5 disabled:opacity-50 shadow-md"
            style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
          >
            {loading ? 'กำลังบันทึก...' : 'บันทึกมื้ออาหาร'}
          </button>
          
          {/* Recent Logs List */}
          <div className="mt-6 border-t border-app-border pt-6">
            <h4 className="text-[0.95rem] font-semibold mb-4 font-prompt flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              บันทึกล่าสุด
            </h4>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.length === 0 ? (
                <p className="text-center text-app-text3 text-sm py-4 font-sarabun">ยังไม่มีบันทึกวันนี้</p>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-app-bg rounded-app-sm border border-app-border hover:border-green-mid transition-colors">
                    <div>
                      <div className="text-[0.9rem] font-semibold font-sarabun text-app-text">{log.name}</div>
                      <div className="text-[0.75rem] text-app-text3 font-sarabun">{log.meal_type} • {log.amount} {log.unit}</div>
                    </div>
                    <div className="text-green-deep font-bold font-prompt text-sm">{log.kcal} kcal</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recipes */}
        <div className="bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border">
          <h3 className="text-[1.05rem] font-semibold mb-1 flex items-center gap-2 font-prompt text-green-deep">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.912 5.886h6.191l-5.008 3.638L17.007 18.41 12 14.772l-5.007 3.638 1.912-5.886-5.008-3.638h6.191L12 3z"/></svg>
            สูตรอาหารแนะนำ
          </h3>
          <p className="text-[0.83rem] text-app-text3 mb-3.5 font-sarabun">ตามเป้าหมายสุขภาพของคุณ</p>
          <div className="grid grid-cols-2 gap-4">
            {recipes.map((r, i) => (
              <div key={i} onClick={() => selectRecipe(r)} className="bg-white rounded-app-sm overflow-hidden border-[1.5px] border-app-border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-app-lg group">
                <div className="h-[100px] flex items-center justify-center text-green-mid" style={{ background: r.bg }}>
                  <div className="transition-transform group-hover:scale-125">{r.icon}</div>
                </div>
                <div className="p-3">
                  <div className="text-[0.88rem] font-semibold mb-1 font-sarabun group-hover:text-green-deep transition-colors">{r.name}</div>
                  <span className={`text-[0.72rem] px-2.5 py-1 rounded-full font-medium font-sarabun ${badgeClass[r.type]}`}>{r.kcal} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
