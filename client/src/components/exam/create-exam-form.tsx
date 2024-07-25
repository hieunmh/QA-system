'use client';

import { useCreateExam } from '@/hooks/exam/useCreateExam';
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiPlus } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import QuestionField from './question-field';

export default function CreateExamForm() {


  const [quantity, setQuantity] = useState([1]);

  const addQuestion = () => {
    setQuantity([...quantity, 1]);

  }

  const removeQuestion = (index: number) => {    
    const newQuantity = [...quantity];
    newQuantity[index] = 0;

    const length = newQuantity.filter((item) => item === 1).length;
    
    if (length == 0) {
      return;
    }
    
    setQuantity(newQuantity);    
  }


  return (
    <ScrollArea className='w-[570px] max-h-[600px] px-5'>
      <div id='questions' className='flex flex-col space-y-5'>

        {quantity.map((item, index) => (
          <>
            {item === 1 && (
              <div key={index} className='bg-[#f5f5f5] shadow-md p-4 rounded-xl'>
                <QuestionField index={index} removeQuestion={removeQuestion} />
              </div>
            )}
          </>
        ))}

        <button onClick={() => addQuestion()} className='hover:underline flex items-center justify-center'>
          <FiPlus size={20} />
          <p>問題を追加</p>
        </button>
        
      </div>

    </ScrollArea>
  )
}


