import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import ListMovies from '../components/ListMovies';

const Home = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [search, setSerach] = useState('')
    const [type, setType] = useState('movie')

    const [isSearchTab, setIsSearchTab] = useState(false)

    const searchBar = (e) => {
        setSerach(e.target.value)
    }
    console.log(isSearchTab);

    return (
        <div className='relative w-full overflow-auto p-4'>
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


                <input type="text" onChange={searchBar} value={search} onClick={() => setIsSearchTab(true)} placeholder='Search' className='mx-auto border-2 px-2' />

                <section className={`fixed top-0 left-0 w-full h-3/4 z-40 bg-black/95 ${isSearchTab ? '' : 'hidden'}`}>
                    <input type="text" value={search} onChange={searchBar} />
                    <button type='button' onClick={() => setIsSearchTab(false)} className='text-white p-2 bg-slate-300 mx-2'>x</button>
                </section>
            </section>


            <Carousel type={type} apiKey={apiKey} />


            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>TOP RATED</h1>
            <ListMovies apiKey={apiKey} type={type} which='top_rated' />

            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>POPULAR</h1>
            <ListMovies apiKey={apiKey} type={type} which='popular' />

            {
                type == 'movie' ?
                    <>
                        <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>COMING SOON</h1>
                        <ListMovies apiKey={apiKey} type={type} which='upcoming' />
                    </>

                    :
                    <>
                        <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>AIRING TODAY</h1>
                        <ListMovies apiKey={apiKey} type={type} which='airing_today' />
                    </>


            }

        </div>
    )
}

export default Home