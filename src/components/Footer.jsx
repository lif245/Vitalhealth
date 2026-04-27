export default function Footer() {
  const links = [
    { label: 'คำถามที่พบบ่อย', href: '#' },
    { label: 'ติดต่อเรา', href: '#' },
    { label: 'นโยบายความเป็นส่วนตัว', href: '#' },
    { label: 'เงื่อนไขการใช้งาน', href: '#' },
  ]

  return (
    <footer className="mt-auto py-10" style={{ background: '#0d6e4f', color: 'white' }}>
      <div className="max-w-[1100px] mx-auto px-7 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map(link => (
            <a key={link.label} href={link.href} className="text-white/70 no-underline text-[0.85rem] font-medium transition-colors hover:text-white font-sarabun tracking-wide">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="text-[0.8rem] font-bold font-prompt text-white/90">Vitalhealth</div>
          <div className="text-[0.75rem] text-white/50 font-sarabun italic">© 2026 สงวนลิขสิทธิ์</div>
        </div>
      </div>
    </footer>
  )
}
