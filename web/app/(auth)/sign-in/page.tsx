'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaLock, FaUser } from 'react-icons/fa';
import { LuLoader } from 'react-icons/lu';

type Inputs = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleShowPass = () => {
    if (showPass) setShowPass(false);
    else setShowPass(true);
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (formData.email.length === 0) {
      setEmailError('Please enter your email');
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError('Invalid email!');
      return;
    } else {
      setEmailError('');
    }

    if (formData.password.length === 0) {
      setPasswordError('Please enter your password');
      return;
    } else if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    } else {
      setPasswordError('');
    }

    setLoading(true);
  }


  return (
    <div className='h-screen w-screen bg-[#fafafc] flex items-center justify-center'>
      <div className='w-[500px] h-[600px] rounded-xl md:shadow-2xl bg-white p-10 flex flex-col justify-center space-y-5'>
        <p className='font-bold text-3xl text-center'>ログイン</p>
        
        <form className='space-y-3'>
          <div className='relative text-[#4a3aff]'>
            <FaUser size={20} className='absolute top-3.5 left-3' />
            <input type="email" placeholder='メール' {...register('email')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
                ${emailError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            <p className='text-rose-500 text-sm h-5'>{emailError}</p>
          </div>

          <div className='relative text-[#4a3aff]'>
            <FaLock size={20} className='absolute top-3.5 left-3' />
            <input type={showPass ? 'text' : 'password'} placeholder='パスワード' {...register('password')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
              ${passwordError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            {showPass ? <IoMdEye size={25} className='absolute top-3.5 right-3 cursor-pointer' onClick={() => toggleShowPass()} /> :
             <IoMdEyeOff size={25} className='absolute top-3.5 right-3 cursor-pointer' onClick={() => toggleShowPass()} /> 
            }
            <p className='text-rose-500 text-sm h-5'>{passwordError}</p>
          </div>


          <button onClick={handleSubmit(onSubmit)} className='w-full bg-[#4a3aff] text-white flex items-center justify-center rounded py-3'>
            {loading ? (
              <LuLoader size={24} className=' animate-spin' />
            ) : (
              <p>ログイン</p>
            )}
          </button>
        </form>

        <p className='text-end text-sm font-semibold'>パスワードをお忘れですか？</p>

        <div className='w-full h-[1px] bg-gray-300 my-5'></div>

        <div className='w-full flex items-center justify-center cursor-pointer'>
          <Image src='/google.png' alt='googlelogo' width={2000} height={2000} className='w-[50px] border p-2 rounded' 
          />
        </div>

        <Link href={'/sign-up'} className='text-center font-bold hover:underline'>新しいアカウントを作成</Link>
      </div>
    </div>
  )
}
