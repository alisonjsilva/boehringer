import React from 'react'

type Props = {
  theme: string
  setTheme: (theme: string) => void,
  setName: (name: string) => void,
  handleGenerateKards: (e: React.FormEvent) => void
}

const KardForm: React.FC<Props> = ({ theme, setTheme, handleGenerateKards, setName }) => {
  return (
    <form onSubmit={handleGenerateKards} className='w-full text-center'>
      <div className='relative w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
        <h2 className='text-xl font-light text-white mb-6'>Enter your nickname to start</h2>
        <input
          type='text'
          required={true}
          className='w-full px-4 py-3 mb-6 text-center text-white placeholder-white/40 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all'
          placeholder='Nickname'
          name='nickname'
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type='submit'
          className='w-full block px-6 py-4 mx-auto text-white text-lg uppercase font-medium bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40'
        >
          Start Game
        </button>

        <p className='text-[10px] text-white/40 pt-4'>
          Availability and licensing may vary by country. Please refer to Global and National
          Competent Authority websites for further information.
        </p>
      </div>
    </form>
  )
}

export default KardForm
