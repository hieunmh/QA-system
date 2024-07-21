'use client';

import { useUser } from '@/hooks/useUser';
import axiosClient from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type SignUpForm = {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function SignUp() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [role, setRole] = useState('teacher');

  const { user, setUser } = useUser();

  const { register, handleSubmit } = useForm<SignUpForm>();

  const togglePassword = () => {
    if (showPass) setShowPass(false);
    else setShowPass(true);
  }

  const signin: SubmitHandler<SignUpForm> = async (form) => {

    if (form.name.length === 0) {
      setNameError('ユーサー名を入力してください。');
      return;
    } else {
      setNameError('');
    }

    if (form.email.length === 0) {
      setEmailError('メールアドレスを入力してください。');
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setEmailError('無効なメールです！');
      return;
    } else {
      setEmailError('');
    }

    if(form.password.length === 0) {
      setPasswordError('パスワードを入力してください。');
      return;
    } else if (form.password.length < 8) {
      setPasswordError('パスワードは8文字以上でなければなりません。')
      return;
    } else {
      setPasswordError('');
    }

    form.role = role;

    setLoading(true);

    await axiosClient.get('/sanctum/csrf-cookie');

    await axiosClient.post('/register', form).then(res => {

    }).catch(error => {
      setServerError('ユーザーが登録されました。');
    }).finally(() => {
      setLoading(false);
    });

    await axiosClient.get('/api/user').then(res => {
      setUser(res.data);
      router.push('/');
    });

  } 

  return (
    <div className='w-screen h-screen md:bg-[#fafafc] flex items-center justify-center'>
      <div className='w-full fixed top-0 h-20 bg-white px-2 lg:px-20 flex justify-between items-center'>
        <Link href="/" className='flex space-x-2'>
          <Image src={'/logo.png'} alt='logo' width={1000} height={1000} className='w-[30px]' />
          <p className='text-[#4a3aff] font-bold text-3xl'>prg</p>
        </Link>
      </div>

      <div className='w-[450px] bg-white rounded-xl md:shadow-xl p-10 flex flex-col items-center justify-center'>
        <p className='font-bold text-3xl'>登録</p>

        <form className=' w-full mt-10' onSubmit={handleSubmit(signin)}>
          <div className='w-full space-y-1'>
            <p className='font-semibold'>ユーサー名</p>
            <input type="text" placeholder='' {...register('name')} disabled={loading}
              className={`focus:outline-none border-[1.5px] rounded-md py-3 px-5 w-full ${nameError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            <p className='text-xs font-semibold text-rose-500 h-5'>{nameError}</p>
          </div>

          <div className='w-full space-y-1'>
            <p className='font-semibold'>メールアドレス</p>
            <input type="text" placeholder='example@co.prg.jp' {...register('email')} disabled={loading}
              className={`focus:outline-none border-[1.5px] rounded-md py-3 px-5 w-full ${emailError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            <p className='text-xs font-semibold text-rose-500 h-5'>{emailError}</p>
          </div>

          <div className='w-full space-y-1 relative'>
            <p className='font-semibold'>パスワード</p>
            <input type={showPass ? 'text' : 'password'} placeholder=''  {...register('password')} disabled={loading}
              className={`focus:outline-none border-[1.5px] rounded-md py-3 px-5 w-full ${passwordError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            {showPass ? <IoEye onClick={() => togglePassword()} size={20} className='text-[#4a3aff] absolute top-10 right-4 cursor-pointer' /> 
            : <IoEyeOff onClick={() => togglePassword()} size={20} className='text-[#4a3aff] absolute top-10 right-4 cursor-pointer' />
            }
            <p className='text-xs font-semibold text-rose-500 h-5'>{passwordError}</p>
          </div>

          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>

          <button className='rounded-md bg-[#4a3aff] hover:bg-[#4a3aff]/95 w-full py-3 font-semibold text-white mt-5 flex items-center justify-center'>
            {loading ? (
              <LuLoader2 size={24} className=' animate-spin' />
            ) : (
              <p>
                登録
              </p>
            )}
          </button>
        </form>

        <div className='text-xs font-semibold text-rose-500 mt-3 h-5'>{serverError}</div>

        <div className='h-[1px] w-full bg-gray-300 mt-3 mb-10' />

        <div className='flex items-center justify-center space-x-1 border rounded-md py-3 w-full cursor-pointer hover:bg-gray-50'>
          <Image src={'/google.png'} alt='google' width={1000} height={1000} className='w-[20px]' />
          <p className='font-semibold'>グーグルでログイン</p>
        </div>

        <Link href={'/signin'} className='hover:underline font-semibold text-sm mt-5'>
          ログイン
        </Link>
      </div>
    </div>
  )
}
