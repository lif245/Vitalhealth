import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // โหลดข้อมูลผู้ใช้จาก localStorage ถ้ามี
    const savedUser = localStorage.getItem('vitalhealth_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // บันทึกข้อมูลลง localStorage เมื่อมีการเปลี่ยนสถานะ
  useEffect(() => {
    if (user) {
      localStorage.setItem('vitalhealth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('vitalhealth_user')
    }
  }, [user])

  const login = (usernameOrEmail, password) => {
    if (
      (usernameOrEmail === 'user' && password === '1234') ||
      (usernameOrEmail.includes('@') && password === '1234')
    ) {
      const displayName = usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail
      setUser({ username: displayName, email: usernameOrEmail, name: 'คุณผู้ใช้' })
      return true
    }
    return false
  }

  const loginWithGoogle = (userData) => {
    if (userData) {
      setUser({ 
        username: userData.name || 'google_user', 
        email: userData.email, 
        name: userData.name,
        avatar: userData.picture 
      })
    }
    return true
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
