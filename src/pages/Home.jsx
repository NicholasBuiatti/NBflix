import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import ListMovies from '../components/ListMovies';

const Home = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [search, setSerach] = useState('')
    const [type, setType] = useState('movie')



    const searchBar = (e) => {
        setSerach(e.target.value)
    }

    return (
        <div className='w-11/12 overflow-auto p-4'>
            {/* mainHeader */}
            <section className='flex'>
                <div>
                    <label htmlFor="movies" className='text-xl mr-2 cursor-pointer'>Movies</label>
                    <input type="radio" id='movies' className='hidden' name='seriesOrMovies' value='movie' checked={type === 'movie'} onChange={() => setType('movie')} />
                    <label htmlFor="series" className='text-xl mx-2 cursor-pointer'>Series</label>
                    <input type="radio" id='series' className='hidden' name='seriesOrMovies' value='tv' checked={type === 'tv'} onChange={() => setType('tv')} />
                    <div className='relative border-2 bg-gray-300 dark:border-red-800 rounded-full'>
                        <motion.div className="absolute h-1.5 w-1/2 bg-gray-300 dark:bg-red-700 rounded-full" initial={{ y: '-50%' }} animate={{ x: type === 'movie' ? '-5%' : '105%' }} transition={{ type: 'spring', stiffness: 300, damping: 50 }}>
                        </motion.div>
                    </div>
                </div>
                <input type="text" onChange={searchBar} value={search} placeholder='Search' className='mx-auto border-2 px-2' />
            </section>
            <section>

                <Carousel type={type} apiKey={apiKey} />
            </section>

            <h1 className='text-4xl font-bold mt-10 mb-5'>TOP RATED</h1>
            <ListMovies apiKey={apiKey} type={type} />
        </div>
    )
}



{/* <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={nextSlide}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button> */}



export default Home