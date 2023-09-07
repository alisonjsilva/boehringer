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
    <form onSubmit={handleGenerateKards} className='w-full text-center md:w-3/4 lg:w-1/2'>
      <div className='relative w-full'>
        {/* <input
          type='text'
          value={theme}
          onChange={handleChange}
          required={true}
          className='w-full px-4 py-3 text-center placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          placeholder='Ingrese tema: Ej. "auto ferrari"'
        /> */}
        <button
          type='submit'
          className='block px-4 py-2 mx-auto mt-4 text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-700'
        >
          Start Game
        </button>
      </div>
    </form>
  )
}

export default KardForm
