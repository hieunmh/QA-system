import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoMdTrash } from 'react-icons/io'
import { Textarea } from '../ui/textarea'
import { Checkbox } from "@/components/ui/checkbox"



export default function QuestionField({ index, removeQuestion }: { index: number, removeQuestion: (index: number) => void }) {

  const [quantity, setQuantity] = useState([1]);

  const addAnswer = () => {
    setQuantity([...quantity, 1]);

  }

  const removeAnswer = (index: number) => {    
    const newQuantity = [...quantity];
    newQuantity[index] = 0;

    const length = newQuantity.filter((item) => item === 1).length;
    
    if (length == 0) {
      return;
    }
    
    setQuantity(newQuantity);    
  }

  return (
    <div className='space-y-3'>
      <div className='w-full flex'>
        <p className='w-[70px]'>問題:</p>
        <Textarea className='w-[400px]' />
      </div>

      {quantity.map((item, id) => (
        <>
          {item === 1 && (
            <div key={id} className='w-full flex items-center space-x-1'>
              <p className='w-[45px]'>答え: </p>
              <Checkbox />
              <input type="text" className='py-2 px-3 border rounded-md w-[400px]' />
              <button  onClick={() => removeAnswer(index)} className='rounded-md text-gray-400 flex items-center justify-center'>
                <FiPlus size={24} className='rotate-45' />
              </button>
            </div>
          )}
        </>
      ))}

      <div className='flex justify-between'>
        <button onClick={() => addAnswer()} className='hover:underline pl-[70px]'>回答を追加</button>
        <button onClick={() => removeQuestion(index)} className='pr-[30px]'>
          <IoMdTrash size={24} />
        </button>
      </div>
    </div>
  )
}

