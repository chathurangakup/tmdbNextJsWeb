import { error } from 'console';
import React, { useState } from 'react';
import CardSkletopn from './CardSkletopn';
import Link from 'next/link';
import { BASE_IMG_URL } from '../utils/conts';


interface propsType{
    img: string,
    id: string,
    title: string,
    releaseDate: string
}


const Card = ({img, id,title,releaseDate}: propsType) => {
const [loaded, setLoaded] =useState(false);
const [error, setError] = useState(false);

  return (
    <div className='group bg-primary h-[450px] md:h-[335px] w-[100%]'>
        {!loaded && !error && <CardSkletopn error={false} />}
        {error && <CardSkletopn error/>}

        <Link className={`${!loaded && error && "hidden"}`}
        href={`/details/${id}`}
        >
            <div className='relative'>
                <img 
                    className='object-cover h-[450px] md:h-[335px] w-[100%]'
                    src={`${BASE_IMG_URL}${img}`}
                    alt="movie poster"
                    onLoad={()=>setLoaded(true)}
                    onError={()=>setError(true)}
                />
                    <div className='absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
                      {title}
                     <p>{releaseDate}</p>
                    </div>
   
            </div>
        
        </Link>
    </div>
  )
}

export default Card