import Link from 'next/dist/client/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='text-center font-light text-textcolor pt-4 text-[13px] md:text-[16px]'>
        @ Uditha  | All right received {new Date().getFullYear()}.
        <p>
            Made by using{" "}
            <Link 
            className="text-white"
            href="https://www.themoviedb.org/"
            target='_blank'
            >
                TMDB API
            </Link>
        </p>
    </div>
  )
}

export default Footer