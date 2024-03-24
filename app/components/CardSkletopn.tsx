import { error } from 'console'
import React from 'react'
import { CiImageOff } from 'react-icons/ci'

const CardSkletopn = ({error}:{error: boolean}) => {

  return (
    <div className={`h-[450px] md:h-[335px] w-[100%] grid place-items-center bg-primary ${!error && "cardSkeleton"}`}>
        {error && <CiImageOff size={56}/>}
    </div>
  )
}

export default CardSkletopn