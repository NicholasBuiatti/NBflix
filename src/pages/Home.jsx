import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';

const Home = () => {
    const [movies, setMovies] = useState([])
    const [search, setSerach] = useState('')
    const [type, setType] = useState('movie')
    const [firstVisible, setFirstVisible] = useState(0)
    const [lastVisible, setLastVisible] = useState(5)
    const apiKey = import.meta.env.VITE_API_KEY;

    const getMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&with_production_countries=US,IT,GB&with_original_language=en&language=it-IT&page=1`)
            const movies = response.data.results
            // console.log(movies);
            setMovies(movies)

        } catch (error) {
            console.log(error);

        }
    }

    const visible = (indice) => {
        return indice >= firstVisible && indice <= lastVisible;
    }

    useEffect(() => {
        getMovies()
    }, [type])

    const searchBar = (e) => {
        setSerach(e.target.value)
    }

    const back = () => {
        setLastVisible((prevLastVisible) => prevLastVisible - 1)
        setFirstVisible((prevFirstVisible) => prevFirstVisible - 1)
    }

    const next = () => {
        setLastVisible((prevLastVisible) => prevLastVisible + 1)
        setFirstVisible((prevFirstVisible) => prevFirstVisible + 1)
    }

    return (
        <div className='w-11/12 overflow-auto'>
            {/* mainHeader */}
            <section className='flex p-3'>
                <div>
                    <label htmlFor="movies">Movies</label>
                    <input type="radio" id='movies' name='seriesOrMovies' value='movie' checked={type === 'movie'} onChange={() => setType('movie')} />
                    <label htmlFor="series">Series</label>
                    <input type="radio" id='series' name='seriesOrMovies' value='tv' checked={type === 'tv'} onChange={() => setType('tv')} />
                </div>

                <input type="text" onChange={searchBar} value={search} placeholder='Search' className='mx-auto border-2 px-2' />
            </section>

            {/* Carousel */}
            <section>
                <Carousel type={type} apiKey={apiKey} />
            </section>



            <div className='flex'>
                <button type='button' onClick={back} className='p-2 bg-orange-400' disabled={firstVisible === 0}>Back</button>
                {movies.filter((movie, index) => visible(index)).map(el => {
                    return type == 'movie' ? (

                        <Card type={type} key={el.id} el={el} />


                    ) : (
                        <Card type={type} key={el.id} el={el} />
                    );
                })
                }
                <button type='button' onClick={next} className='p-2 bg-orange-400' disabled={lastVisible === movies.length - 1}>Next</button>
            </div>
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

const Card = ({ el, type }) => {
    const baseImg = 'https://image.tmdb.org/t/p/w200';
    return (
        <>
            <div className='relative'>
                <figure>
                    <img src={`${baseImg}${el.poster_path}`} alt="" />
                </figure>
                {
                    type === 'movie' ?
                        <h1 className='absolute top-0'>{el.title}</h1>
                        :
                        <h1 className='absolute top-0'>{el.name}</h1>
                }

            </div>
        </>
    )
}

export default Home