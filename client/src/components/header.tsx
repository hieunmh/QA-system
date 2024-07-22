'use client';

import axiosClient from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';


export default function Header() {

  const { user, setUser } = useUser();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['XSRF-TOKEN', 'laravel_session']);

  useEffect(() => {
    const getUser = async () => {
      
      if (cookies['XSRF-TOKEN']) {
        await axiosClient.get('/sanctum/csrf-cookie');
        await axiosClient.get('/api/user').then(res => {
          setUser(res.data);
          
        }).catch(error => {
          Promise.reject(error)
        });
      }
    }
    
    getUser();
  }, []); 

  const signout = async () => {
    await axiosClient.post('/logout');
    setUser(null);
    router.push('/signin');
    removeCookie('XSRF-TOKEN');
    removeCookie('laravel_session');
  }

  return (
    <div className='w-full fixed top-0 h-20 bg-white px-2 lg:px-20 flex justify-between items-center'>
      <Link href="/" className='flex space-x-2'>
        <Image src={'/logo.png'} alt='logo' width={1000} height={1000} className='w-[30px]' />
        <p className='text-[#4a3aff] font-bold text-3xl'>prg</p>
      </Link>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>{user.name}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signout()}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex space-x-3 font-semibold text-sm md:text-base'>
        <Link href={'/signin'} className='border rounded-xl py-3 px-5 hover:bg-gray-50'>
          ログイン
        </Link>

        <Link href={'/signup'} className='border rounded-xl py-3 px-5 bg-[#4a3aff] hover:bg-[#4a3aff]/95 text-white'>
          始めましょう
        </Link>
      </div>
      )}


    </div>
  )
}
