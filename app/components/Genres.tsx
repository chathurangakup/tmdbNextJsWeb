import Link from 'next/link';
import React from 'react';


interface Igenres {
    index: number;
    name: string;
    length: number;
    id:number
}

const Genres = ({index, name, length, id}: Igenres) => {
  return (
      <Link href={`/genres/${id}?genre=${name.toLocaleLowerCase()}`}>
        <div>
            <div className='flex gap-4 text-textColor hover:text-white'>
                {name}
            </div>
            <div className='text-textColor'>{index +1 !== length ? "/": ""}</div>
        </div>
      </Link>
  )
}

export default Genres