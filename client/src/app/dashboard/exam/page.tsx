'use client';

import React from 'react';

import ExamHeader from '@/components/exam/header';
import ExamPagination from '@/components/exam/pagination';
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { useExamPagination } from '@/hooks/useExamPagination';

export default function Exam() {

  const examList = [
    {
      name: '数学',
      questionNumber: 10,
      time: 30,
      doneNumber: 1
    },
    {
      name: '物理',
      questionNumber: 8,
      time: 25,
      doneNumber: 4
    },
    {
      name: '英語',
      questionNumber: 50,
      time: 45,
      doneNumber: 25
    },
    {
      name: '化学',
      questionNumber: 20,
      time: 15,
      doneNumber: 1
    },
    {
      name: '文学',
      questionNumber: 25,
      time: 50,
      doneNumber: 26
    },
    {
      name: '歴史',
      questionNumber: 15,
      time: 30,
      doneNumber: 11
    },
  ];

  const { page, perPage } = useExamPagination();

  return (
    <div className='w-full bg-[#fafafc]'>
      <div className='flex h-full flex-col justify-between w-full'>
        <ExamHeader />

        <div className='h-full p-5'>
          <div className='flex justify-between'>
            <p className='font-bold text-3xl'>テスト</p>
            <button className='flex items-center space-x-2 font-semibold border py-2 px-3 rounded-md border-[#4a3aff] text-[#4a3aff] relative group'>
              <span className='rounded absolute top-0 left-0 w-0 h-full transition-all duration-200 ease-linear transform group-hover:w-full bg-[#4a3aff]'></span>
              <FaPlus className='relative group-hover:text-white' size={20} />
              <p className='relative group-hover:text-white'>テストを作成</p>
            </button>
          </div>

          <div className='h-full w-full py-5'>
            <div className='h-full w-full rounded-md p-5 bg-white shadow-lg'>
              <div className='w-full grid grid-cols-12 font-semibold border-b pb-5'>
                <div className='col-span-1 text-center'>番</div>
                <div className='col-span-3 text-center'>主題</div> 
                <div className='col-span-2 text-center'>質問数</div> 
                <div className='col-span-2 text-center'>時間（分）</div> 
                <div className='col-span-2 text-center'>やったの数</div> 
                <div className='col-span-2 text-center'>アクション</div>
              </div>

              <div className='w-full'>
                {examList.slice(perPage * (page - 1), perPage * page).map((exam, index) => (
                  <div key={index} className='w-full grid grid-cols-12 border-b py-5 cursor-pointer hover:bg-gray-50'>
                    <div className='col-span-1 text-center'>{perPage * (page - 1) + index + 1}</div>
                    <div className='col-span-3 text-center'>{exam.name}</div> 
                    <div className='col-span-2 text-center'>{exam.questionNumber}</div> 
                    <div className='col-span-2 text-center'>{exam.time}</div>
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
