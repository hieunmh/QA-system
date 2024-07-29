'use client';

import { useExam } from '@/hooks/exam/useExam';
import axiosClient from '@/lib/axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ExamId() {

  const { exams } = useExam();
  const params = useParams();
  const [exam, setExam] = useState(exams.find(exam => exam.code === params.exam_code ));

  useEffect(() => {
    const getExam = async () => {
      if (!exam) {
        await axiosClient.get('/api/getExam', {
          params: {
            code: params.exam_code
          }
        }).then(res => {
          setExam(res.data);
        });
      }
    }

    getExam();
  }, []);

  return (
    <div className='w-full h-full bg-[#fafafc] flex flex-col'>
      <div className='w-full'>
        <div className='w-full bg-[#c6d2fd] p-5 flex justify-center relative'>
          <div className='font-semibold absolute left-5'>コード: {exam?.code}</div>
          <div className='font-bold text-3xl'>{exam?.subject}</div>
          <div className='font-semibold absolute right-5'>時間: {exam?.time}分</div>
        </div>
      </div>

      <div className='w-full py-5 px-10 flex justify-end space-x-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><FaEdit size={24} /></TooltipTrigger>
            <TooltipContent>
              <p>編集</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><IoMdTrash size={24} /></TooltipTrigger>
            <TooltipContent>
              <p>削除</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className='w-full space-y-5 overflow-y-auto no-scrollbar px-5 pb-5'>
        {exam?.questions.map((question, index) => (
          <div key={index}  className='w-full bg-white border rounded-md shadow-md p-5 space-y-2'>
            <div className='rounded-md space-x-2 w-full'>
              <span className='font-semibold'>問題 { index + 1 }</span>: {question.content}:
            </div>
            
            <div>
              {question.answers.map((answer, id) => (
                <div key={id} className={`py-1 rounded-md w-fit ${answer.is_correct && 'text-green-500 font-semibold'}`}>
                  <span>{ String.fromCharCode(65 + id) }</span> . {answer.content}
                </div>
              ))}
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}
