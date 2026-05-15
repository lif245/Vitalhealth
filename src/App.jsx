import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useHealthStore } from './store/useHealthStore'
import useSmartReminders from './hooks/useSmartReminders'
import AICoachChat from './components/AICoachChat'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import FoodPage from './pages/FoodPage'
import SleepPage from './pages/SleepPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const { user } = useAuth()
  const { isDarkMode } = useHealthStore()
  
  // Initialize smart reminders globally
  useSmartReminders()

  // If not logged in → show login page
  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage onSuccess={() => {}} />} />
      </Routes>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''} bg-app-bg text-app-text transition-colors duration-300`}>
      <Header />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-7">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <AICoachChat />
    </div>
  )
}
