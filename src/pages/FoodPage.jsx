import { useState, useRef } from 'react'
import { useToast } from '../context/ToastContext'
import { useHealthStore } from '../store/useHealthStore'
import PageTransition from '../components/PageTransition'

const recipes = [
  { name: 'สลัดอกไก่ย่าง', cal: 320, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', tag: 'โปรตีนสูง' },
  { name: 'ข้าวผัดควินัว', cal: 450, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', tag: 'ใยอาหารสูง' },
  { name: 'สมูทตี้เบอร์รี่', cal: 180, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80', tag: 'วิตามินซี' },
]

export default function FoodPage() {
  const { showToast } = useToast()
  const { logs, addLog } = useHealthStore()
  const [foodName, setFoodName] = useState('')
  const [foodCal, setFoodCal] = useState('')
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setAnalyzing(true)
    showToast('กำลังให้ AI วิเคราะห์รูปภาพ...', 'info')

    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Data = reader.result
        
        const response = await fetch('/api/analyze-food', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            base64Image: base64Data,
            mimeType: file.type
          })
        })

        if (!response.ok) throw new Error('API Error')
        
        const data = await response.json()
        setFoodName(data.name || '')
        setFoodCal(data.kcal ? data.kcal.toString() : '')
        showToast('วิเคราะห์สำเร็จ! ตรวจสอบข้อมูลก่อนบันทึก', 'success')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error(error)
      showToast('ไม่สามารถวิเคราะห์ภาพได้ ลองใหม่อีกครั้ง', 'error')
    } finally {
      setAnalyzing(false)
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAdd = () => {
    if (!foodName || !foodCal) {
      showToast('กรุณากรอกชื่ออาหารและแคลอรี')
      return
    }
    setLoading(true)
    setTimeout(() => {
      addLog({
        type: 'food',
        value: parseInt(foodCal),
        label: `${foodName} (${foodCal} kcal)`
      })
      showToast(`บันทึก ${foodName} เรียบร้อย!`)
      setFoodName('')
      setFoodCal('')
      setLoading(false)
    }, 600)
  }

  const selectRecipe = (r) => {
    setFoodName(r.name)
    setFoodCal(r.cal.toString())
    showToast(`เลือก ${r.name} แล้ว`)
  }

  const recentFood = logs.filter(log => log.type === 'food').slice(0, 3)

  return (
    <PageTransition>
    <div className="py-9">
      <div className="mb-7">
        <h2 className="text-[1.6rem] font-bold font-prompt text-app-text">บันทึกอาหาร</h2>
        <p className="text-app-text3 text-[0.95rem] mt-1 font-sarabun">ติดตามปริมาณพลังงานที่คุณได้รับในแต่ละมื้อ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Card */}
        <div className="lg:col-span-1 bg-white rounded-app p-7 shadow-app border-[1.5px] border-app-border h-fit">
          <h3 className="text-[1.05rem] font-semibold mb-5 flex items-center gap-2 font-prompt text-green-deep">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            เพิ่มเมนูใหม่
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">ชื่ออาหาร</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={foodName}
                  onChange={e => setFoodName(e.target.value)}
                  placeholder="เช่น ข้าวมันไก่" 
                  className="flex-1 px-3.5 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white transition-all"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={analyzing}
                  title="ถ่ายรูปด้วย AI"
                  className="w-11 h-[44px] flex items-center justify-center bg-green-pale text-green-deep rounded-app-sm border-[1.5px] border-green-mid/30 hover:bg-green-mid/20 transition-all disabled:opacity-50 shrink-0"
                >
                  {analyzing ? (
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[0.88rem] font-medium text-app-text2 mb-1.5 font-sarabun">แคลอรี (kcal)</label>
              <input 
                type="number" 
                value={foodCal}
                onChange={e => setFoodCal(e.target.value)}
                placeholder="0" 
                className="w-full px-3.5 py-2.5 border-[1.5px] border-app-border rounded-app-sm bg-app-bg text-app-text font-sarabun text-[0.95rem] outline-none focus:border-green-mid focus:bg-white transition-all"
              />
            </div>
            <button 
              onClick={handleAdd}
              disabled={loading}
              className="w-full py-3 rounded-app-sm font-prompt font-semibold text-white text-[1rem] transition-all hover:opacity-90 hover:-translate-y-px shadow-md disabled:opacity-70 mt-2"
              style={{ background: 'linear-gradient(135deg, #16a97a, #0891b2)' }}
            >
              {loading ? 'กำลังเพิ่ม...' : 'เพิ่มลงในบันทึก'}
            </button>
          </div>

          {/* Recent Food */}
          <div className="mt-8 pt-6 border-t border-app-bg2">
            <div className="text-[0.85rem] text-app-text3 mb-3 font-sarabun">มื้อล่าสุด</div>
            {recentFood.length > 0 ? (
              <div className="space-y-2">
                {recentFood.map(f => (
                  <div key={f.id} className="flex justify-between items-center p-3 bg-app-bg2 rounded-app-sm border border-app-border">
                    <span className="text-[0.85rem] font-medium text-app-text font-sarabun truncate max-w-[120px]">{f.label}</span>
                    <span className="text-[0.75rem] text-app-text3 font-sarabun">{new Date(f.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-[0.85rem] text-app-text3 bg-app-bg2 rounded-app-sm border border-dashed border-app-border">
                ยังไม่มีข้อมูลอาหาร
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[1.05rem] font-semibold flex items-center gap-2 font-prompt text-green-deep">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              เมนูแนะนำเพื่อสุขภาพ
            </h3>
            <button className="text-[0.85rem] text-green-mid hover:text-green-deep font-sarabun font-medium">ดูทั้งหมด</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recipes.map((r, i) => (
              <div key={i} 
                onClick={() => selectRecipe(r)}
                className="group flex bg-white rounded-app overflow-hidden shadow-app border-[1.5px] border-app-border cursor-pointer transition-all hover:border-green-mid hover:-translate-x-1"
              >
                <div className="w-40 h-32 overflow-hidden">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-prompt font-semibold text-app-text text-[1.1rem]">{r.name}</h4>
                    <span className="text-green-deep font-bold font-prompt">{r.cal} kcal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-pale text-green-deep text-[0.7rem] rounded-full font-sarabun border border-green-mid/20">{r.tag}</span>
                    <span className="text-[0.75rem] text-app-text3 font-sarabun">ใช้เวลาเตรียม 15 นาที</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
