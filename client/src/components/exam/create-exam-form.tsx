'use client';

import { useCreateExam } from '@/hooks/exam/useCreateExam';
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaTimes } from "react-icons/fa";

export default function CreateExamForm() {

  const { code, time } = useCreateExam();
  const [quantity, setQuantity] = useState([0]);


  const addQuestion = () => {
    setQuantity([...quantity, 0]);
    console.log(quantity);
    
  }

  const deleteQuestion = (id: number) => {
    setQuantity(newquantity => newquantity.filter((_, index) => index !== id));
  }


  return (
    <ScrollArea className='w-[600px]'>
      <div id='questions' className='flex flex-col space-y-5'>
        {quantity.map((item, index) =>  ( 
          <div className='bg-[#f1f1f1] p-8 rounded-xl relative'>
            <button onClick={() => deleteQuestion(index)} className='absolute right-0 top-0 bg-[#ff002f] p-1 rounded-tr-xl'>
              <FaTimes className='text-white' />
            </button>
            <div className='space-y-3'>
              <div className='w-full flex'>
                <p className='w-[80px]'>問題 {index + 1}:</p>
                <Textarea />
              </div>

              <div className='w-full flex space-x-2'>
                <p className='w-[80px]'>答え 1: </p>
                <input type="text" className='py-2 px-3 border rounded-md w-full' />
                <button className='w-[80px] bg-[#ff002f] rounded-md text-white'>削除</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      <button onClick={() => addQuestion()}
        className='w-full text-[#4a3aff] border-[1.5px] border-[#4a3aff] hover:bg-[#4a3aff] hover:text-white mt-5 py-2 rounded-md font-semibold'
      >
        問題を追加
      </button>
    </ScrollArea>
  )
}
