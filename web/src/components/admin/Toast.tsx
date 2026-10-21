'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { X } from 'lucide-react'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  text: string
}

interface ToastContextType {
  toast: (text: string, type?: 'success' | 'error' | 'info') => void
  success: (text: string) => void
  error: (text: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, type, text }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const success = useCallback((text: string) => addToast(text, 'success'), [addToast])
  const error = useCallback((text: string) => addToast(text, 'error'), [addToast])

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 rounded-md shadow-lg text-sm font-medium flex items-center justify-between gap-3 border transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              t.type === 'success'
                ? 'bg-[#2E3B1C] text-[#F3EFE6] border-[#4F5B2A]'
                : t.type === 'error'
                  ? 'bg-[#5B231F] text-[#FBF9F4] border-[#8A3B35]'
                  : 'bg-[#2B231F] text-[#FBF9F4] border-[#4A3D36]'
            }`}
          >
            <span>{t.text}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="text-xs opacity-70 hover:opacity-100 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
