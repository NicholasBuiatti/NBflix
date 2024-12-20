import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
const ListMovies = ({ type, apiKey, which, onMovieSelect }) => {
    const [movies, setMovies] = useState([])
    const [firstVisible, setFirstVisible] = useState(0)
    const [lastVisible, setLastVisible] = useState(6)
    const [isAnimating, setIsAnimating] = useState(false);
    const [isReverseAnimating, setIsReverseAnimating] = useState(false);

    const getMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${type}/${which}?api_key=${apiKey}&with_production_countries=US,IT,GB&with_original_language=en&language=it-IT&page=1`)
            const movies = response.data.results
            // console.log(movies);
            setMovies(movies)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getMovies()
    }, [type])

    const visible = (indice) => {
        return indice >= firstVisible && indice <= lastVisible;
    }

    const next = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setLastVisible((prevLastVisible) => prevLastVisible + 1)
            setFirstVisible((prevFirstVisible) => prevFirstVisible + 1)
            setIsAnimating(false)
        }, 200)
    }

    const back = () => {
        setIsReverseAnimating(true)
        setLastVisible((prevLastVisible) => prevLastVisible - 1)
        setFirstVisible((prevFirstVisible) => prevFirstVisible - 1)

        setTimeout(() => {
            setIsReverseAnimating(false)
        }, 200)
    }

    // Funzione per aggiornare 'lastVisible' in base alla larghezza dello schermo
    const updateVisibleCards = () => {
        if (window.innerWidth < 340) {
            setLastVisible(1);
        } else if (window.innerWidth < 580) {
            setLastVisible(2);
        } else if (window.innerWidth < 980) {
            setLastVisible(3);
        } else {
            setLastVisible(6)
        }
    };


    useEffect(() => {
        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);

        // Cleanup dell'event listener
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    return (
        <>
            <div className='overflow-hidden relative'>
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={back} disabled={firstVisible === 0}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 ">
                        <svg
                            className="w-4 h-4 text-white rotate-180"
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
                    </span>
                </button>
                <div className="flex w-full">
                    {movies
                        .filter((_, index) => visible(index))
                        .map((el, index) => (
                            <motion.div
                                key={el.id}
                                initial={{ width: (index === 0 && isReverseAnimating) ? '0%' : 'auto' }}
                                animate={{
                                    width: (index === 0 && isAnimating)
                                        ? '0%' : 'auto'
                                }}
                                transition={{ duration: 0.2 }}
                                className='flex'
                            >
                                <Card
                                    el={el}
                                    type={type}
                                    which={which}
                                    onClick={() => onMovieSelect(el)}
                                />
                            </motion.div>
                        ))}
                </div>

                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={next} disabled={lastVisible === movies.length - 1}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
                        <svg
                            className="w-4 h-4 text-white"
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
                    </span>
                </button>
            </div>
        </>
    )
}

export const Card = ({ el, type, onClick }) => {
    const baseImg = 'https://image.tmdb.org/t/p/w200';

    // funzione per avere le un array su cui ciclare per avere le stelle come valutazione 
    //Troncamento a una cifra decimale
    const truncated = parseFloat(el.vote_average.toFixed(1));
    //Arrotondamento a 0.5 o all'intero successivo
    const rounded = Math.round(truncated * 2) / 2;
    //Numero di stelle piene
    const fullStars = Math.floor(rounded) / 2;
    // Mezza stella
    const hasHalfStar = rounded % 1 !== 0;



    return (
        <>
            <div className='relative w-52'>
                <figure onClick={onClick} className='relative h-full mx-1 rounded-xl overflow-hidden shadow-2xl cursor-pointer'>
                    <img src={`${baseImg}${el.poster_path}`} className='h-full w-full object-cover' alt="" />
                    {type == 'movie' ?
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className='absolute flex flex-col top-0 left-0 h-full w-full px-2 py-1 text-white text-center bg-black/80'
                        >
                            <h1 className='text-2xl'>{el.title}</h1>
                            <p className='text-start'>lingua: {el.original_language}</p>

                            <div className='mt-auto'>
                                {/* Stelle piene */}
                                {Array.from({ length: fullStars }, (_, i) => (
                                    <i key={i} className="fa-solid fa-star text-yellow-300"></i>
                                ))}
                                {hasHalfStar && <i className="fa-solid fa-star-half text-yellow-300"></i>}
                            </div>
                        </motion.div>
                        :
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='absolute flex flex-col top-0 left-0 h-full w-full px-2 py-1 text-white text-center bg-black/80'
                            >
                                <h1 className='text-2xl'>{el.name}</h1>
                                <p className='text-start'>Lingua: {el.original_language}</p>
                                <div className='mt-auto'>
                                    {/* Stelle piene */}
                                    {Array.from({ length: fullStars }, (_, i) => (
                                        <i key={i} className="fa-solid fa-star text-yellow-300"></i>
                                    ))}
                                    {hasHalfStar && <i className="fa-solid fa-star-half text-yellow-300"></i>}
                                </div>
                            </motion.div>

                        </>

                    }
                </figure>
            </div>
        </>
    )
}

ListMovies.propTypes = {
    type: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    which: PropTypes.string.isRequired,
    onMovieSelect: PropTypes.func.isRequired,
};

Card.propTypes = {
    el: PropTypes.shape({
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        backdrop_path: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
        original_language: PropTypes.string,
        release_date: PropTypes.string,
        first_air_date: PropTypes.string,
        overview: PropTypes.string,
    }).isRequired,
    which: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ListMovies