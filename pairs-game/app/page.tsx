import Image from 'next/image'

export default function Home() {
  return (
    <main className=" p-2 bg-[#1b3664]">
      {/* <Image src="/images/Icon00.png" width={200} height={200} alt="Boehringer Ingelheim logo" /> */}
      <div className='min-h-screen min-w-full bg-company-image bg-no-repeat bg-top bg-cover flex justify-center items-center relative'>
        <div className='min-h-fit min-w-full p-24 flex items-center justify-center'>
          <div className=''>
            <input className='bg-transparent text-white text-xl rounded-md mx-2' type='text' placeholder='Enter your name' />
            <button className='bg-transparent text-white text-xl rounded-md border-2 my-2 p-1 mx-2' type='button'>Start</button>
          </div>
        </div>
      </div>
    </main>
  )
}
