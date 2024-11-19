import { useState } from 'react'
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import ListMovies from '../components/ListMovies';
import SearchMovies from '../components/SearchMovies';
import MovieDetails from '../components/MovieDetails';
const Home = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [type, setType] = useState('movie')
    const [isSearchTab, setIsSearchTab] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie); // Salva il film selezionato nello stato
    };

    const closeDetails = () => {
        setSelectedMovie(null); // Chiude la finestra dei dettagli
    };

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

                <button type='button' className='ml-auto w-8 border-2 border-black dark:border-white hover:border-red-500 hover:dark:border-red-500 hover:text-red-500 rounded-3xl shadow-xl hover:border-2 ' onClick={() => setIsSearchTab(true)}><i className="fa-solid fa-magnifying-glass"></i></button>

                <section className={`fixed top-0 left-0 w-full h-full p-4 z-40 bg-black/95 ${isSearchTab ? '' : 'hidden'}`}>
                    <SearchMovies type={type} setIsSearchTab={setIsSearchTab} apiKey={apiKey} onMovieSelect={handleMovieSelect} />
                </section>
            </section>


            <Carousel type={type} apiKey={apiKey} />

            {/* Mostra i dettagli se un film è selezionato */}
            {selectedMovie && (
                <MovieDetails movie={selectedMovie} type={type} onClose={closeDetails} />

            )}


            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>TOP RATED</h1>
            <ListMovies apiKey={apiKey} type={type} which='top_rated' onMovieSelect={handleMovieSelect} />

            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>POPULAR</h1>
            <ListMovies apiKey={apiKey} type={type} which='popular' onMovieSelect={handleMovieSelect} />

            {
                type == 'movie' ?
                    <>
                        <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>COMING SOON</h1>
                        <ListMovies apiKey={apiKey} type={type} which='upcoming' onMovieSelect={handleMovieSelect} />
                    </>

                    :
                    <>
                        <h1 className='text-xl sm:text-2xl md:text-4xl font-bold mt-10 mb-5'>AIRING TODAY</h1>
                        <ListMovies apiKey={apiKey} type={type} which='airing_today' onMovieSelect={handleMovieSelect} />
                    </>


            }

        </div>
    )
}

export default Home