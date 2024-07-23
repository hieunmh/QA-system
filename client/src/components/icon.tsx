import React from 'react'
import { IconType } from 'react-icons'

export default function Icon({ icon, className, size }: { icon: IconType, className: string, size: number }) {

  const Icon = icon;

  return (
    <>
      <Icon size={size} className={className} />
    </>
  )
}
