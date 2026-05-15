'use client'

import React, { useCallback } from 'react'

type Props = {
  onKeyPress: (key: string) => void
  onBackspace: () => void
  onEnter: () => void
  onClose: () => void
  visible: boolean
}

const KEYBOARD_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const keyBase =
  'flex items-center justify-center flex-1 min-w-0 min-h-0 text-white text-xl md:text-2xl font-light rounded-xl bg-white/10 border border-white/15 active:bg-white/30 active:scale-95 transition-all duration-150 touch-manipulation select-none shadow-sm'

const VirtualKeyboard: React.FC<Props> = ({ onKeyPress, onBackspace, onEnter, onClose, visible }) => {
  const press = useCallback(
    (fn: () => void) => (e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      fn()
    },
    []
  )

  return (
    <div
      className={`w-full max-w-[900px] mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-3 md:p-4 shadow-2xl flex flex-col transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
      onPointerDown={(e) => e.preventDefault()}
      aria-hidden={!visible}
    >
      {/* Top bar with close button */}
      <div className="flex justify-end mb-2 flex-shrink-0">
        <button
          type="button"
          onPointerDown={press(onClose)}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all touch-manipulation"
          aria-label="Close keyboard"
          tabIndex={visible ? 0 : -1}
        >
          <span className="text-base leading-none">×</span>
          <span>Close</span>
        </button>
      </div>

      <div className="flex flex-col gap-1.5 md:gap-2">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 md:gap-2 w-full h-11 md:h-12">
            {rowIndex === 3 && (
              <button
                type="button"
                onPointerDown={press(onBackspace)}
                className={`${keyBase} flex-[1.5] bg-white/15 text-2xl`}
                aria-label="Backspace"
                tabIndex={visible ? 0 : -1}
              >
                ⌫
              </button>
            )}
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onPointerDown={press(() => onKeyPress(key))}
                className={keyBase}
                tabIndex={visible ? 0 : -1}
              >
                {key}
              </button>
            ))}
            {rowIndex === 3 && (
              <button
                type="button"
                onPointerDown={press(onEnter)}
                className={`${keyBase} flex-[1.5] bg-blue-600/80 border-blue-400/40 active:bg-blue-500 text-2xl`}
                aria-label="Enter"
                tabIndex={visible ? 0 : -1}
              >
                ✓
              </button>
            )}
          </div>
        ))}

        {/* Space bar */}
        <div className="flex justify-center h-11 md:h-12">
          <button
            type="button"
            onPointerDown={press(() => onKeyPress(' '))}
            className={`${keyBase} max-w-[60%] text-sm uppercase tracking-widest text-white/70`}
            aria-label="Space"
            tabIndex={visible ? 0 : -1}
          >
            Space
          </button>
        </div>
      </div>
    </div>
  )
}

export default VirtualKeyboard
