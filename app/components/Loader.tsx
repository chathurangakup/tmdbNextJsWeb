import React from 'react'

const Loader = () => {
  return (
    <div className='absolute left-[10%] top-40%]  bg-[#00000007a] w-[100%] h-[100%] grid place-items-center' >
        <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader