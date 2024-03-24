'use client'

import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/conts';
import Link from 'next/dist/client/link';

const Sidebar = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenere, setSelectedGenere] = useState("");

    const params = useParams();
    const searchParams = useSearchParams();

    interface Igenre {
        id: string;
        name: string;
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
            .then(({ data }) => {
                console.log("yyyyy", data.genres)
                setGenres(data.genres)
            }).catch((e) => console.log(e))
    },[])

    useEffect(() => {
        if (searchParams.get('genre')) {
            setSelectedGenere(searchParams.get('genre')!);
            return
        }
        setSelectedGenere(params.id.toString());
    }, [params.id])

    return (
        <div className='bg-primary px-10 
    max-h-[calc(100vh-77px)] 
    pb-6 overflow-y-scroll 
    scrollbar-thin scrollbar-thumb-[#22222a]
    scrollbar-track-primary hidden md:block
    '>
            <div className='flex flex-col gap-4 pt-4'>
                <p className='slidebarTitle'>Discover</p>
                <Link href="/discover/now_playing">
                    <p className={`slidebarLink ${selectedGenere === "now_playing" ? "sidebaeActive" : "" }`}>
                        Now Playing
                    </p>
                </Link>

                <Link
                    href='/discover/top_rated'
                >
                    <p className={`sidebarLink ${selectedGenere == "top_rated" ? "sidebarActive" : ""
                        }`}>
                        Top Rated
                    </p>
                </Link>

                <Link
                    href='/discover/populer'
                >
                    <p className={`sidebarLink ${selectedGenere == "populer" ? "sidebarActive" : ""
                        }`}>
                        Populer
                    </p>
                </Link>

                <Link
                    href='/discover/upcoming'
                >
                    <p className={`sidebarLink ${selectedGenere == "upcoming" ? "sidebarActive" : ""
                        }`}>
                        Upcoming
                    </p>
                </Link>
            </div>

            <div className='flex flex-col gap-4 pt-4'>
                <p className='slidebarTitle'>Genres</p>
                {genres.map((genre: Igenre) =>
                    <Link key={genre.id}
                        href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
                        className='w-fit'
                    >
                        <p className={`sidebarLink ${genre.name.toLocaleLowerCase() === selectedGenere ? "sidebarActive" : ""}`}>
                            {genre.name}
                        </p>
                    </Link>)}
            </div>
        </div>
    )
}

export default Sidebar