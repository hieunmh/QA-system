import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {


  return (
    <div className='w-full fixed top-0 h-20 bg-white px-2 lg:px-20 flex justify-between items-center'>
      <Link href="/" className='flex space-x-2'>
        <Image src={'/logo.png'} alt='logo' width={1000} height={1000} className='w-[30px]' />
        <p className='text-[#4a3aff] font-bold text-3xl'>prg</p>
      </Link>

      <div className='flex space-x-3 font-semibold text-sm md:text-base'>
        <Link href={'/signin'} className='border rounded-xl py-3 px-5 hover:bg-gray-50'>
          ログイン
        </Link>

        <Link href={'/signin'} className='border rounded-xl py-3 px-5 bg-[#4a3aff] hover:bg-[#4a3aff]/95 text-white'>
          始めましょう
        </Link>
      </div>
    </div>
  )
}
