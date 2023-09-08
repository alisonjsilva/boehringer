import React from 'react'

type Props = {
  theme: string
  setTheme: (theme: string) => void
  handleGenerateKards: (e: React.FormEvent) => void
}

const KardForm: React.FC<Props> = ({ theme, setTheme, handleGenerateKards }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value)
  }

  return (
    <form onSubmit={handleGenerateKards} className='w-full text-center'>
      <div className='relative w-full'>
        {/* <input
          type='text'
          value={theme}
          onChange={handleChange}
          required={true}
          className='w-full px-4 py-3 text-center placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          placeholder='Ingrese tema: Ej. "auto ferrari"'
        /> */}
        {/* <input
          type='text'
          required={true}
          className='w-full px-4 py-3 mb-6 text-center placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          placeholder='Name'
        />
        <input
          type='email'
          required={true}
          className='w-full px-4 py-3 text-center placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          placeholder='Email'
        /> */}
        <button
          type='submit'
          className='w-full block px-4 py-2 mx-auto mt-4 text-[#1a3664] uppercase bg-gray-300 rounded-lg hover:bg-gray-400'
        >
          Start Game
        </button>
      </div>
    </form>
  )
}

export default KardForm
