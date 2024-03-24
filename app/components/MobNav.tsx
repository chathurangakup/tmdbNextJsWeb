'use client'

import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/conts';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/dist/client/link';


interface propsType {
    input: string;
    setInput: Dispatch<SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
}

interface Igenre {
    id: string;
    name: string
}

const Mobnav = ({ input, setInput, handleSubmit }: propsType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenere, setSelectedGenere] = useState("");

    const searchParams = useSearchParams();
    const params = useParams();

    useEffect(() => {
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
            .then(({ data }) => {
                console.log("yyyytt",data.genres)
                setGenres(data.genres)
            }).catch((e) => console.log('djshdjhsjdh' + e))
    }, [])

    useEffect(() => {
        if (searchParams.get('genre')) {
            setSelectedGenere(searchParams.get('genre')!);
            return
        }
        setSelectedGenere(params.id.toString());
    }, [searchParams.get('genre'), params.id])

    return (
        <>
            <form className='md:hidden flex justify-between w-[100%]' onSubmit={handleSubmit}>
                <div onClick={() => setIsOpen(true)}>
                    <AiOutlineMenu size={30} />
                </div>
                <div className='space-x-4'>
                    <input
                        className='bg-secondry px-4 py-2 outline-none placeholder:text-textcolor text-[14px] w-[180px]'
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='search movies...'
                    />

                    <button
                        type="submit"
                        className='bg-secondry text-textcolor py-2 px-4 hover:bg-textcolor hover:text-white text-[14px]'
                    >
                        Search
                    </button>
                </div>
            </form>


            {/* Full screen nav */}
            <div className={`min-h-[100vh] max-h-[100vh] w-[100%] bg-primary fixed left-0 top-0 z-10 overflow-scroll ${isOpen ? "block" : "hidden"
                }`}>
                <div className='sticky top-0 bg-primary py-4 w-[100%]'>
                    <IoMdClose
                        onClick={() => setIsOpen(false)}
                        className='absolute top-0 right-0 m-2 mt-7'
                        size={28}
                    />
                    <Link
                        className="w-fit"
                        href="/discover/now_playing"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className='sidebarTitle text-[28px] text-center'>
                            Movie Verse
                        </div>
                    </Link>
                </div>

                <div className='px-4 pb-16'>
                    <div className='flex flex-col gap-4 pt-4'>
                        <p className='sidebarTitle'>
                            Discover
                        </p>
                        <Link
                            className='w-fit'
                            href='/discover/now_playing'
                            onClick={() => setIsOpen(false)}
                        >
                            <p className={`sidebarLink ${selectedGenere == "now_playing" ? "sidebarActive" : ""
                                }`}>
                                Now Playing
                            </p>
                        </Link>

                        <Link
                            className='w-fit'
                            href='/discover/top_rated'
                            onClick={() => setIsOpen(false)}
                        >
                            <p className={`sidebarLink ${selectedGenere == "top_rated" ? "sidebarActive" : ""
                                }`}>
                                Top Rated
                            </p>
                        </Link>

                        <Link
                            className='w-fit'
                            href='/discover/populer'
                            onClick={() => setIsOpen(false)}
                        >
                            <p className={`sidebarLink ${selectedGenere == "populer" ? "sidebarActive" : ""
                                }`}>
                                Populer
                            </p>
                        </Link>
                    </div>

                    <div className='flex flex-col gap-4 pt-4'>
                        <p className='slidebarTitle'>Genres</p>
                        {genres.map((genre: Igenre) => 
                        <Link key={genre.id} 
                        href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`} 
                        className='w-fit'
                        onClick={()=>setIsOpen(false)}>
                            <p className={`sidebarLink ${genre.name.toLocaleLowerCase() === selectedGenere ? "sidebarActive" : ""}`}>
                                {genre.name}
                            </p>
                        </Link>)}
                    </div>

                </div>

            </div>

        </>
    )
}

export default Mobnav