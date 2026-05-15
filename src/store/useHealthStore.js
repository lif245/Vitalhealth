import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const todayStr = () => new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"

export const useHealthStore = create(
  persist(
    (set, get) => ({
      steps: 0,
      caloriesBurned: 0,
      caloriesIntake: 0,
      sleepHours: 0,
      logs: [], // { id, type, value, label, date }
      lastResetDate: todayStr(),
      isDarkMode: false,
      notificationSettings: {
        exercise: { active: false, time: '06:00' },
        food: { active: false, time: '12:00' },
        sleep: { active: false, time: '22:00' },
        water: { active: false, interval: '2' },
        emailAlert: { active: false }
      },

      // Check and auto-reset daily stats if it's a new day
      checkDailyReset: () => {
        const today = todayStr()
        if (get().lastResetDate !== today) {
          set({ steps: 0, caloriesBurned: 0, caloriesIntake: 0, sleepHours: 0, lastResetDate: today })
        }
      },

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      updateNotificationSettings: (key, updates) => set((state) => ({
        notificationSettings: {
          ...state.notificationSettings,
          [key]: { ...state.notificationSettings[key], ...updates }
        }
      })),

      addLog: (entry) => set((state) => {
        const today = todayStr()
        // Auto-reset if new day
        const isNewDay = state.lastResetDate !== today
        const resetStats = isNewDay ? { steps: 0, caloriesBurned: 0, caloriesIntake: 0, sleepHours: 0, lastResetDate: today } : {}

        const newEntry = {
          ...entry,
          id: Date.now(),
          date: new Date().toISOString()
        }
        
        const updatedLogs = [newEntry, ...state.logs]
        let updates = { ...resetStats, logs: updatedLogs }
        
        const base = isNewDay ? 0 : state.caloriesBurned

        if (entry.type === 'exercise') {
          updates.caloriesBurned = (isNewDay ? 0 : state.caloriesBurned) + entry.value
        } else if (entry.type === 'food') {
          updates.caloriesIntake = (isNewDay ? 0 : state.caloriesIntake) + entry.value
        } else if (entry.type === 'sleep') {
          updates.sleepHours = entry.value // Latest sleep entry for the day
        } else if (entry.type === 'steps') {
          updates.steps = (isNewDay ? 0 : state.steps) + entry.value
        }

        return updates
      }),

      resetData: () => set({
        steps: 0,
        caloriesBurned: 0,
        caloriesIntake: 0,
        sleepHours: 0,
        logs: [],
        lastResetDate: todayStr()
      })
    }),
    {
      name: 'vitalhealth_storage',
    }
  )
)
