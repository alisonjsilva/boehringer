import React from 'react'

type Props = {
  theme: string
  setTheme: (theme: string) => void,
  setName: (name: string) => void,
  handleGenerateKards: (e: React.FormEvent) => void
  nickname: string
  onInputClick: () => void
  compact?: boolean
}

const KardForm: React.FC<Props> = ({ handleGenerateKards, nickname, onInputClick, compact = false }) => {
  return (
    <form onSubmit={handleGenerateKards} className='w-full text-center'>
      <div
        className={`relative w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-300 ease-out ${
          compact ? 'p-3 md:p-4' : 'p-6'
        }`}
      >
        <h2
          className={`font-light text-white transition-all duration-300 ease-out overflow-hidden ${
            compact ? 'text-base mb-2 max-h-6 opacity-80' : 'text-xl mb-6 max-h-12 opacity-100'
          }`}
        >
          Enter your nickname to start
        </h2>
        <input
          type='text'
          required={true}
          readOnly={true}
          inputMode='none'
          className={`w-full text-center text-white placeholder-white/40 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all cursor-pointer ${
            compact ? 'px-4 py-2 text-base' : 'px-4 py-3 mb-2 text-base'
          }`}
          placeholder='Nickname'
          name='nickname'
          value={nickname}
          onClick={onInputClick}
          onFocus={(e) => e.target.blur()}
        />

        <button
          type='submit'
          className={`w-full block mx-auto text-white uppercase font-medium bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 ${
            compact ? 'px-4 py-2 mt-3 text-sm' : 'px-6 py-4 mt-4 text-lg'
          }`}
        >
          Start Game
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            compact ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <p className='text-[10px] text-white/40 pt-4 overflow-hidden'>
            Availability and licensing may vary by country. Please refer to Global and National
            Competent Authority websites for further information.
          </p>
        </div>
      </div>
    </form>
  )
}

export default KardForm
