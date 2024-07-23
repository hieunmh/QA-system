'use client';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { GrTest } from 'react-icons/gr';
import Icon from '../icon';
import { PiSignOutBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import axiosClient from '@/lib/axios';
import { useUser } from '@/hooks/useUser';
import { useCookies } from 'react-cookie';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LuLoader2 } from 'react-icons/lu';

export default function LeftSidebar() {

  const sidebarItem = [
    {
      icon: GoHomeFill,
      name: 'ダッシュボード',
      link: '/dashboard'
    },
    {
      icon: GrTest,
      name: 'テスト',
      link: '/dashboard/exam'
    },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['XSRF-TOKEN', 'laravel_session']);

  const { user, setUser } = useUser();

  const signout = async () => {
    setLoading(true);
    await axiosClient.post('/logout');
    setUser(null);
    router.push('/signin');
    removeCookie('XSRF-TOKEN');
    removeCookie('laravel_session');
    setLoading(false);
  }

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


  return (
    <div className='w-[300px] h-full bg-[#4a3aff] py-10'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col space-y-5'>
          {sidebarItem.map((item, index) => (
            <Link href={item.link} key={index} className='h-[50px]'>
              <div className='flex items-center h-full w-full'>
                <span className={`h-full w-1 rounded-r-xl ${item.link === pathname && 'bg-white'}`} />

                <div className={`flex px-5 items-center space-x-3 ${item.link === pathname ? 'text-white' : 'text-white'}`}>
                  <Icon size={24} icon={item.icon} className='' />
                  <p>{item.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='flex flex-col space-y-5'>
          <div className='flex items-center w-full px-5 space-x-3 text-white'>
            <IoMdSettings size={24} />
            <p>設定</p>
          </div>

          <Dialog>
            <DialogTrigger className='flex items-center w-full px-5 space-x-3 text-white'>
              <PiSignOutBold size={24} />
              <p>ログアウト</p>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>本当にログアウトしますか?</DialogTitle>
              </DialogHeader>

              <DialogFooter className="flex justify-start font-semibold">
                <DialogClose asChild>
                  <button className='border w-[120px] border-[#4a3aff] text-[#4a3aff] py-2 rounded-md'>
                    閉じる  
                  </button>
                </DialogClose>

                <button onClick={() => signout()} className='bg-[#4a3aff] w-[120px] text-white py-2 rounded-md flex items-center justify-center'>
                  {loading ? (
                    <LuLoader2 size={24} className=' animate-spin' />
                  ) : (
                    <p>
                      ログアウト
                    </p>
                  )}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
