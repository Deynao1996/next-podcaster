import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type LogoProps = {
  iconWidth: number
  iconHeight: number
}

const Logo = ({ iconWidth, iconHeight }: LogoProps) => {
  return (
    <Link href={'/'} className="flex items-center gap-3">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={iconWidth}
        height={iconHeight}
      />
      <p className="scroll-m-20 text-2xl font-bold tracking-tight">Podcaster</p>
    </Link>
  )
}

export default Logo
