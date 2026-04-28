import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (usernameOrEmail, password) => {
    // Check if it's the default test user or if it looks like an email and has password '1234'
    if (
      (usernameOrEmail === 'user' && password === '1234') ||
      (usernameOrEmail.includes('@') && password === '1234')
    ) {
      // Extract username from email if needed
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
