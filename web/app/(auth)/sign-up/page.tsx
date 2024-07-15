'use client';

import { SIGNUP_URL } from '@/lib/apiEndPoints';
import axios from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { LuLoader } from 'react-icons/lu';

type Inputs = {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {

  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>()
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toggleShowPass = () => {
    if (showPass) setShowPass(false);
    else setShowPass(true);
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {

    if (formData.username.length === 0) {
      setUserError('ユーサー名を入力してください')
      return;
    } else {
      setUserError('');
    }

    if (formData.email.length === 0) {
      setEmailError('メールアドレスを入力してください');
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError('無効なメールアドレス');
      return;
    } else {
      setEmailError('');
    }

    if (formData.password.length === 0) {
      setPasswordError('パスワードを入力してください');
      return;
    } else if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    } else {
      setPasswordError('');
    }

    setLoading(true);
    
    await axios.post(SIGNUP_URL, formData);

    setLoading(false);

    router.push('/');
  }

  return (
    <div className='h-screen w-screen bg-[#fafafc] flex items-center justify-center'>
      <div className='w-full fixed top-0 h-20 bg-white md:px-32 px-2 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Image src='/logo.png' width={1000} height={1000} className='w-[30px]' alt='logo' />
          <Link href={'/'} className='font-semibold text-3xl text-[#4a3aff]'>prg</Link>
        </div>
      </div>
      <div className='w-[450px] rounded-xl md:shadow-2xl bg-white p-10 flex flex-col justify-center'>
        <p className='font-bold text-3xl text-center mb-5'>登録</p>

        <form className='space-y-1'>
          <div className='relative text-[#4a3aff]'>
            <p className='font-semibold text-black'>ユーサー名</p>
            <FaUser size={20} className='absolute top-[37.5px] left-3' />
            <input type="email" placeholder='桐生戦兎' {...register('username')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
                ${userError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            <p className='text-rose-500 text-sm h-5'>{userError}</p>
          </div>

          <div className='relative text-[#4a3aff]'>
            <p className='font-semibold text-black'>メールアドレス</p>
            <FaUser size={20} className='absolute top-[37.5px] left-3' />
            <input type="email" placeholder='example@prg.co.jp' {...register('email')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
                ${emailError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            <p className='text-rose-500 text-sm h-5'>{emailError}</p>
          </div>

          <div className='relative text-[#4a3aff]'>
            <p className='font-semibold text-black'>パスワード</p>
            <FaLock size={20} className='absolute top-[37.5px] left-3' />
            <input type={showPass ? 'text' : 'password'} placeholder='パスワード' {...register('password')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
              ${passwordError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            {showPass ? <IoMdEye size={25} className='absolute top-[37.5px] right-3 cursor-pointer' onClick={() => toggleShowPass()} /> :
             <IoMdEyeOff size={25} className='absolute top-[38px] right-3 cursor-pointer' onClick={() => toggleShowPass()} /> 
            }
            <p className='text-rose-500 text-sm h-5'>{passwordError}</p>
          </div>

          <button onClick={handleSubmit(onSubmit)} className='w-full bg-[#4a3aff] text-white flex items-center justify-center rounded py-3'>
            {loading ? (
              <LuLoader size={24} className=' animate-spin' />
            ) : (
              <p className='font-semibold'>登録</p>
            )}
          </button>
        </form>  

        <div className='w-full h-[1px] bg-gray-300 my-5'></div>

        <div className='flex items-center justify-center cursor-pointer border rounded p-2 space-x-1 hover:bg-gray-50'>
          <Image src='/google.png' alt='googlelogo' width={2000} height={2000} className='w-[16px]' />
          <p className='font-semibold'>グーグルでログイン</p>
        </div>

        <Link href={'/sign-in'} className='text-center font-bold hover:underline mt-5'>ログイン</Link>
      </div>
    </div>
  )
}
