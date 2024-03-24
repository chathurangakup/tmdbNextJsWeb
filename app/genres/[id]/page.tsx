'use client'

import Card from '@/app/components/Card';
import Footer from '@/app/components/Footer';
import Loader from '@/app/components/Loader';
import { Imovie } from '@/app/discover/[id]/page';
import { BASE_URL } from '@/app/utils/conts';
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const Genres = () => {

    const [title, setTitle] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurentPage] =useState(1);
    const [totalPage, setTotlePage] =useState(1);
    const mainRef=useRef<HTMLDivElement>(null);


    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams()

    useEffect(()=>{
        mainRef?.current?.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        });

        const id = params.id;
        const genre = searchParams.get("genre");
        const page = searchParams.get("page")


        setTitle(`${genre} Movies`);

        axios.get(`${BASE_URL}/discover/movie`,{
            params:{
              api_key: process.env.NEXT_PUBLIC_API_KEY,
              with_genres: id,
              page
            }
          }).then((response)=>{
            console.log('res:', response)
      
            setMovies(response.data.results)
            setCurentPage(response.data.page)
            setTotlePage(response.data.totalPage)
          }).catch(error => console.log(error))

    },[params.id, searchParams.get("page")])
    

    const handlePageCgange = (button: string) => {
        let page= "";
        if(button == "prev"){
          page = `page=${currentPage - 1}`;
        }else{
          page = `page=${currentPage + 1}`;
        }
    
        router.push(`/genres/${params.id}?genre=${searchParams.get("genre")}&${page}`)
      }


  return (
    <main className='bg-secondry max-h-[calc(100vh-77px)]  min-h-[calc(100vh-77px) p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative]]'
    ref={mainRef}
    >
     <h2 className='text-[24px] tracking-[2px]'>{title}</h2>
     {movies.length === 0 && <Loader/>}
 
     <div className='grid gap-8 moviesGrid place-items-center mt-8'>
       {movies.map((movie: Imovie)=>(
         <Card
           key={movie.id}
           img={movie.poster_path}
           id={movie.id}
           title={movie.title}
           releaseDate={movie.release_date}
         />
       ))}
 
     </div>
 
     <div className='flex justify-center gap-16 py-6 pt-16'>
       <button onClick={()=>handlePageCgange('prev')} className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${currentPage === 1 && "hidden"}`}>Prev</button>
       <button onClick={()=>handlePageCgange('next')} className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${currentPage === totalPage && "hidden"}`}>Next</button>
 
 
     </div>
 
     <div className='pb-20'>
       <Footer/>
     </div>
 
    </main>
  )
}

export default Genres;