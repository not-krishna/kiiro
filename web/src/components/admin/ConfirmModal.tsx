'use client'

import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isDanger?: boolean
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-md w-full p-6 shadow-2xl space-y-4">
        <h3 className="font-display text-xl text-[#2B231F] font-semibold">{title}</h3>
        <p className="font-sans text-sm text-[#6E635B] leading-relaxed">{message}</p>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E1D5]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#D8CEBE] bg-white text-[#2B231F] rounded-md text-sm font-medium hover:bg-[#F3EFE6] transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${
              isDanger ? 'bg-[#8A3B35] hover:bg-[#6D2E29]' : 'bg-[#4F5B2A] hover:bg-[#3D4721]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
