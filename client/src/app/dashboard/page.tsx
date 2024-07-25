'use client';

import { useCreateQuestion } from '@/hooks/exam/useCreateQuestion';
import React, { useEffect } from 'react'

export default function Dashboard() {

  const { questions } = useCreateQuestion();

  return (
    <div className='w-full h-full bg-[#fafafc] flex items-center justify-center'>
      <div className='h-full flex'>
          {questions.map(q => (
            <div>
              {q.content}
            </div>
          ))}
      </div>
    </div>
  )
}
