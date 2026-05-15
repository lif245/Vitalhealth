import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHealthStore } from '../store/useHealthStore'

export default function AICoachChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'สวัสดีครับ! ผมคือ AI Health Coach ของคุณ มีอะไรให้ผมช่วยแนะนำเกี่ยวกับสุขภาพ วันนี้ไหมครับ?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const healthData = useHealthStore()

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Mock API response based on context
    setTimeout(() => {
      let reply = 'ฟีเจอร์นี้อยู่ระหว่างการเชื่อมต่อ API จริงครับ 😊'
      
      if (userMessage.content.includes('แคลอรี') || userMessage.content.includes('กิน')) {
        reply = `วันนี้คุณเผาผลาญไปแล้ว ${healthData.caloriesBurned} kcal และรับประทานไป ${healthData.caloriesIntake} kcal ครับ ถือว่าทำได้ดีเลย! แนะนำให้ทานโปรตีนเพิ่มในมื้อเย็นนะครับ`
      } else if (userMessage.content.includes('เดิน') || userMessage.content.includes('ก้าว')) {
        reply = `ยอดเยี่ยมมาก! วันนี้คุณเดินไปแล้ว ${healthData.steps} ก้าว พยายามเดินให้ถึง 10,000 ก้าวเพื่อสุขภาพที่แข็งแรงนะครับ`
      } else if (userMessage.content.includes('นอน')) {
        reply = `คุณนอนไป ${healthData.sleepHours} ชั่วโมงเมื่อคืน ถ้ามีอาการอ่อนเพลีย คืนนี้ลองเข้านอนไวขึ้นสัก 30 นาทีดูนะครับ`
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-deep text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-deep p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                </div>
                <div>
                  <h3 className="font-prompt font-semibold text-[1rem]">AI Health Coach</h3>
                  <p className="text-[0.7rem] opacity-80">Powered by Claude API</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#f8fdfa]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-[0.9rem] font-sarabun ${
                    msg.role === 'user' ? 'bg-green-deep text-white rounded-br-sm' : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="ถามอะไร AI ก็ได้..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-[0.9rem] font-sarabun outline-none focus:border-green-deep focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-green-deep text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
