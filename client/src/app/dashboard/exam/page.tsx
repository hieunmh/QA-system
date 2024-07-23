'use client';

import React, { useState } from 'react';

import ExamHeader from '@/components/exam/header';
import ExamPagination from '@/components/exam/pagination';
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { useExamPagination } from '@/hooks/exam/useExamPagination';
import randomstring from 'randomstring';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { LuLoader2 } from 'react-icons/lu';
import { useCreateExam } from '@/hooks/exam/useCreateExam';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Exam() {

  const examList = [
    {
      name: '数学',
      questionNumber: 10,
      time: 30,
      code: 'abcxyz',
      doneNumber: 1
    },
    {
      name: '物理',
      questionNumber: 8,
      time: 25,
      code: 'abcxyz',
      doneNumber: 4
    },
    {
      name: '英語',
      questionNumber: 50,
      time: 45,
      code: 'abcxyz',
      doneNumber: 25
    },
    {
      name: '化学',
      questionNumber: 20,
      time: 15,
      code: 'abcxyz',
      doneNumber: 1
    },
    {
      name: '文学',
      questionNumber: 25,
      time: 50,
      code: 'abcxyz',
      doneNumber: 26
    },
    {
      name: '歴史',
      questionNumber: 15,
      time: 30,
      code: 'abcxyz',
      doneNumber: 11
    },
  ];

  const { page, perPage } = useExamPagination();
  const { code, setCode, time, setTime } = useCreateExam();
  const [loading, setLoading] = useState(false);

  return (
    <div className='w-full bg-[#fafafc]'>
      <div className='flex h-full flex-col justify-between w-full'>
        <ExamHeader />

        <div className='h-full p-5'>
          <div className='flex justify-between'>
            <p className='font-bold text-3xl'>テスト</p>
            <div className='flex items-center space-x-2 font-semibold border py-2 px-3 rounded-md border-[#4a3aff] text-[#4a3aff] relative group'>
              <span className='rounded absolute top-0 left-0 w-0 h-full transition-all duration-200 ease-linear transform group-hover:w-full bg-[#4a3aff]'></span>
              <FaPlus className='relative group-hover:text-white' size={20} />
              
              <Dialog>
                <DialogTrigger>
                  <p className='relative group-hover:text-white'>テストを作成</p>
                </DialogTrigger>

                <DialogContent className=''>
                  <DialogHeader>
                    <DialogTitle className='text-center'>テストを作成</DialogTitle>
                  </DialogHeader>

                  <div className='w-full space-y-5'>
                    <div className='w-full flex items-center space-x-2'>
                      <p className='w-[100px] h-full'>コード</p>
                      <input type="text" placeholder='コードを入力してください' className='w-full border py-2 px-3 rounded-md' 
                        value={code} onChange={(e) => setCode(e.target.value)}
                      />
                      <button onClick={() => setCode(randomstring.generate({ length: 10, charset: ['alphanumeric'] }))} 
                        className='bg-[#4a3aff] py-2 w-[100px] font-semibold text-white rounded-md'
                      >
                        生成
                      </button>
                    </div>

                    <div className='flex items-center'>
                      <p className='w-[90px] h-full'>時間:</p>
                      <input type="number" placeholder='時間（分）' className='w-full border py-2 px-3 rounded-md' />
                    </div>

                    <div className='flex items-center'>
                      <p className='w-[90px] h-full'>レビュー:</p>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="許可" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">許可</SelectItem>
                          <SelectItem value="false">許可しない</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='flex items-center'>
                      <p className='w-[90px] h-full'>やり直す:</p>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="許可" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">許可</SelectItem>
                          <SelectItem value="false">許可しない</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>


                  </div>

                  <DialogFooter className="flex justify-start font-semibold">
                    <DialogClose asChild>
                      <button className='border w-[120px] border-[#4a3aff] text-[#4a3aff] py-2 rounded-md'>
                        閉じる  
                      </button>
                    </DialogClose>

                    <button className='bg-[#4a3aff] w-[120px] text-white py-2 rounded-md flex items-center justify-center'>
                      {loading ? (
                        <LuLoader2 size={24} className=' animate-spin' />
                      ) : (
                        <p>
                          作成
                        </p>
                      )}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          <div className='h-full w-full py-5'>
            <div className='h-full w-full rounded-md p-5 bg-white shadow-lg'>
              <div className='w-full grid grid-cols-12 font-semibold text-sm border-b pb-5'>
                <div className='col-span-1 text-center'>番</div>
                <div className='col-span-2 text-center'>主題</div> 
                <div className='col-span-2 text-center'>コード</div> 
                <div className='col-span-2 text-center'>質問数</div> 
                <div className='col-span-1 text-center'>時間（分）</div> 
                <div className='col-span-2 text-center'>やったの数</div> 
                <div className='col-span-2 text-center'>アクション</div>
              </div>

              <div className='w-full'>
                {examList.slice(perPage * (page - 1), perPage * page).map((exam, index) => (
                  <div key={index} className='w-full grid grid-cols-12 border-b py-5 cursor-pointer hover:bg-gray-50'>
                    <div className='col-span-1 text-center'>{perPage * (page - 1) + index + 1}</div>
                    <div className='col-span-2 text-center'>{exam.name}</div> 
                    <div className='col-span-2 text-center'>{exam.code}</div> 
                    <div className='col-span-2 text-center'>{exam.questionNumber}</div> 
                    <div className='col-span-1 text-center'>{exam.time}</div>
                    <div className='col-span-2 text-center'>{exam.doneNumber}</div> 
                    <div className='col-span-2 text-center flex items-center justify-center space-x-2'>
                      <button>
                        <FaEdit size={20} />
                      </button>
                      <button>
                        <IoMdTrash size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        
        <ExamPagination />        
      </div>
    </div>
  )
}
