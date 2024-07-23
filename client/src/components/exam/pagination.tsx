'use client';

import React from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useExamPagination } from '@/hooks/exam/useExamPagination';


export default function ExamPagination() {

  const { page, setPage, perPage, pageNumber } = useExamPagination();

  return (
    <Pagination className='py-5'>
      <PaginationContent>
        <PaginationItem className='cursor-pointer' onClick={() => setPage(page - 1 <= 0 ? 1 : page - 1)}>
          <PaginationPrevious/>
        </PaginationItem>

        {[...Array(pageNumber)].map((key, index) => (
          <PaginationItem className='cursor-pointer' key={index} onClick={() => setPage(index + 1)}>
            <PaginationLink isActive={page == index + 1}>{index + 1}</PaginationLink>
          </PaginationItem>
        ))}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem className='cursor-pointer' onClick={() => setPage(page + 1 > pageNumber ? page : page + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
