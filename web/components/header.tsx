import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='w-full h-20 bg-white md:px-32 px-2 flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <Image src='/logo.png' width={1000} height={1000} className='w-[30px]' alt='logo' />
        <Link href={'/'} className='font-semibold text-3xl text-[#4a3aff]'>prg</Link>
      </div>

      <div className='flex items-center space-x-3'>
        <Link href='/sign-in' className='border px-5 py-2.5 flex rounded-xl hover:bg-gray-50'>
          ログイン
        </Link>

        <Link href='sign-up' className='border px-5 py-2.5 bg-[#4a3aff] hover:bg-[#4a3aff]/95 text-white flex rounded-xl'>
          始めましょう
        </Link>
      </div>
    </div>
  )
}
