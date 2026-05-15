import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useHealthStore = create(
  persist(
    (set) => ({
      steps: 0,
      caloriesBurned: 0,
      caloriesIntake: 0,
      sleepHours: 0,
      logs: [], // { id, type, value, label, date }
      isDarkMode: false,
      notificationSettings: {
        exercise: { active: false, time: '06:00' },
        food: { active: false, time: '12:00' },
        sleep: { active: false, time: '22:00' },
        water: { active: false, interval: '2' },
        emailAlert: { active: false }
      },

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      updateNotificationSettings: (key, updates) => set((state) => ({
        notificationSettings: {
          ...state.notificationSettings,
          [key]: { ...state.notificationSettings[key], ...updates }
        }
      })),

      addLog: (entry) => set((state) => {
        const newEntry = {
          ...entry,
          id: Date.now(),
          date: new Date().toISOString()
        }
        
        const updatedLogs = [newEntry, ...state.logs]
        
        let updates = { logs: updatedLogs }
        
        if (entry.type === 'exercise') {
          updates.caloriesBurned = state.caloriesBurned + entry.value
        } else if (entry.type === 'food') {
          updates.caloriesIntake = state.caloriesIntake + entry.value
        } else if (entry.type === 'sleep') {
          updates.sleepHours = entry.value // Overwrite with latest sleep or add? Usually overwrite for daily.
        } else if (entry.type === 'steps') {
          updates.steps = state.steps + entry.value
        }

        return updates
      }),

      resetData: () => set({
        steps: 0,
        caloriesBurned: 0,
        caloriesIntake: 0,
        sleepHours: 0,
        logs: []
      })
    }),
    {
      name: 'vitalhealth_storage', // name of the item in the storage (must be unique)
    }
  )
)
