import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import FoodPage from './pages/FoodPage'
import SleepPage from './pages/SleepPage'
import SettingsPage from './pages/SettingsPage'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('home')

  // If not logged in → show login page
  if (!user) {
    return <LoginPage onSuccess={() => setActivePage('home')} />
  }

  const pages = {
    home: <HomePage setActivePage={setActivePage} />,
    exercise: <ExercisePage />,
    food: <FoodPage />,
    sleep: <SleepPage />,
    settings: <SettingsPage />,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-7">
        {pages[activePage] || pages.home}
      </main>
      <Footer />
    </div>
  )
}
