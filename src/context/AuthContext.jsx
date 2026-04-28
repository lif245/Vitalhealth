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

  const loginWithGoogle = () => {
    // Simulate a successful Google login with a mock user
    setUser({ 
      username: 'google_user', 
      email: 'user@gmail.com', 
      name: 'Google User',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c' 
    })
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
