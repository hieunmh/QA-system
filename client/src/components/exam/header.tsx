'use client';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ExamHeader() {

  const { user } = useUser();

  return (
    <div className='w-full flex items-center justify-between bg-white h-24 p-5 space-x-5'>
      <div className='w-full relative flex'>
        <input type="text" placeholder='検索するには入力してください' className='border border-gray-300 rounded-md w-full py-3 pl-3 pr-16' />
        <div className='absolute h-[calc(100%-12px)] w-[56px] top-1.5 right-1.5 bg-[#4a3aff] rounded flex items-center justify-center'>
          <FaMagnifyingGlass size={20} className=' text-white' />
        </div>
      </div>

      <Select onValueChange={(value) => {}}>
        <SelectTrigger className="w-[150px] h-[52px] font-semibold">
          <SelectValue placeholder="並び替え" />
        </SelectTrigger>
        <SelectContent className='font-semibold'>
          <SelectItem value="名">名</SelectItem>
          <SelectItem value="時間">時間</SelectItem>
          <SelectItem value="質問数">質問数</SelectItem>
        </SelectContent>
      </Select>

      <Image alt='avatar' src={`http://127.0.0.1:8000/${user?.image}`} width={1000} height={1000} className='w-[52px] h-[52px] rounded-full border' />

    </div>
  )
}
