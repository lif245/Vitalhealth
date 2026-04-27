import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import { Utensils, Search, Clock, List, ChefHat, Save, TrendingUp } from 'lucide-react'

const recipes = [
  { icon: '🥗', bg: '#f0fdf4', name: 'สลัดไก่อบ', kcal: '320 kcal', type: 'green' },
  { icon: '🍳', bg: '#fff7ed', name: 'ไข่คนผัก', kcal: '180 kcal', type: 'orange' },
  { icon: '🐟', bg: '#e0f2fe', name: 'ปลานึ่งซีอิ๊ว', kcal: '210 kcal', type: 'blue' },
  { icon: '🥣', bg: '#fdf4ff', name: 'โอ๊ตมีลผลไม้', kcal: '290 kcal', type: 'green' },
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
    if (!form.name) return showToast('⚠️ กรุณาใส่ชื่ออาหาร')
    setLoading(true)
    try {
      const res = await fetch('/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        showToast('✅ บันทึกมื้ออาหารสำเร็จ!')
        setForm({ ...form, name: '' })
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
          <Utensils className="text-blue-500" size={32} />
          บันทึกการทานอาหาร
        </h2>
        <p className="text-app-text3 text-[1rem] mt-1 font-sarabun">ติดตามโภชนาการและแคลอรีที่คุณได้รับในแต่ละวัน</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="col-span-6 bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border h-fit">
          <h3 className="text-[1.1rem] font-bold mb-6 font-prompt flex items-center gap-2">
            <Search size={20} className="text-blue-500" />
            ค้นหาหรือระบุอาหาร
          </h3>
          
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="ระบุชื่ออาหาร..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-app-bg border-[1.5px] border-app-border rounded-2xl font-sarabun focus:bg-white focus:border-blue-400 outline-none transition-all text-[1rem]"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-text3" size={20} />
            </div>

            <div className="flex gap-2 flex-wrap">
              {chips.map(c => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, name: c })}
                  className="px-4 py-2 rounded-xl bg-app-bg text-app-text2 text-[0.85rem] font-medium border border-app-border cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-sarabun"
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.9rem] font-bold text-app-text mb-2.5 font-prompt">ปริมาณ</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3.5 bg-app-bg border-[1.5px] border-app-border rounded-xl font-sarabun focus:bg-white focus:border-blue-400 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[0.9rem] font-bold text-app-text mb-2.5 font-prompt">หน่วย</label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full px-4 py-3.5 bg-app-bg border-[1.5px] border-app-border rounded-xl font-sarabun focus:bg-white focus:border-blue-400 outline-none transition-all cursor-pointer"
                >
                  <option>กรัม (g)</option>
                  <option>มิลลิลิตร (ml)</option>
                  <option>ชิ้น</option>
                  <option>ถ้วย</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[0.9rem] font-bold text-app-text mb-2.5 font-prompt">มื้ออาหาร</label>
              <div className="grid grid-cols-4 gap-2">
                {['มื้อเช้า', 'มื้อกลางวัน', 'มื้อเย็น', 'ของว่าง'].map(m => (
                  <button
                    key={m}
                    onClick={() => setForm({ ...form, meal_type: m })}
                    className={`py-2.5 rounded-xl border-[1.5px] text-[0.85rem] font-bold font-sarabun transition-all ${
                      form.meal_type === m ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm' : 'bg-white border-app-border text-app-text3 hover:bg-app-bg'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-prompt font-bold text-white text-[1.05rem] border-none cursor-pointer shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #0891b2)' }}
            >
              <div className="flex items-center justify-center gap-2">
                <Save size={20} />
                {loading ? 'กำลังบันทึก...' : 'บันทึกมื้ออาหาร'}
              </div>
            </button>
          </div>
        </div>

        {/* List & Stats Section */}
        <div className="col-span-6 space-y-8">
          {/* Recent Logs */}
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-6 font-prompt flex items-center gap-2">
              <List size={20} className="text-blue-500" />
              รายการทานวันนี้
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.length === 0 ? (
                <p className="text-center text-app-text3 text-[0.9rem] py-10 opacity-50 font-sarabun italic">ยังไม่มีข้อมูลมื้ออาหารวันนี้</p>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-app-bg rounded-2xl border border-app-border hover:border-blue-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                        {log.meal_type[0]}
                      </div>
                      <div>
                        <div className="text-[1rem] font-bold font-prompt text-app-text">{log.name}</div>
                        <div className="text-[0.8rem] text-app-text3 font-sarabun">{log.meal_type} • {log.amount} {log.unit}</div>
                      </div>
                    </div>
                    <div className="text-blue-600 font-bold font-prompt text-[1.1rem]">{log.kcal} <span className="text-[0.7rem] opacity-70">kcal</span></div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recipes */}
          <div className="bg-white rounded-3xl p-8 shadow-app border-[1.5px] border-app-border">
            <h3 className="text-[1.1rem] font-bold mb-1 font-prompt flex items-center gap-2">
              <ChefHat size={20} className="text-blue-500" />
              สูตรอาหารแนะนำ
            </h3>
            <p className="text-[0.85rem] text-app-text3 mb-6 font-sarabun">แนะนำตามโภชนาการที่เหมาะสม</p>
            <div className="grid grid-cols-2 gap-4">
              {recipes.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-app-border cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="h-[80px] flex items-center justify-center text-[2.5rem]" style={{ background: r.bg }}>{r.icon}</div>
                  <div className="p-4">
                    <div className="text-[0.95rem] font-bold font-prompt mb-1">{r.name}</div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-green-500" />
                      <span className={`text-[0.75rem] px-2 py-0.5 rounded-full font-bold font-sarabun ${badgeClass[r.type]}`}>{r.kcal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
