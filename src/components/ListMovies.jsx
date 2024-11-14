import { useState, useEffect } from 'react'
import axios from 'axios'
const ListMovies = ({ type, apiKey, which }) => {
    const [movies, setMovies] = useState([])
    const [firstVisible, setFirstVisible] = useState(0)
    const [lastVisible, setLastVisible] = useState(5)



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

    const back = () => {
        setLastVisible((prevLastVisible) => prevLastVisible - 1)
        setFirstVisible((prevFirstVisible) => prevFirstVisible - 1)
    }

    const next = () => {
        setLastVisible((prevLastVisible) => prevLastVisible + 1)
        setFirstVisible((prevFirstVisible) => prevFirstVisible + 1)
    }

    // Funzione per aggiornare 'lastVisible' in base alla larghezza dello schermo
    const updateVisibleCards = () => {
        if (window.innerWidth < 640) {
            setLastVisible(2);
        } else {
            setLastVisible(5);
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
            <div className='flex relative'>
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={back} disabled={firstVisible === 0}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
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
                {movies.filter((movie, index) => visible(index)).map(el => {
                    return type == 'movie' ? (
                        <Card key={el.id} el={el} which={which} />
                    ) : (
                        <Card key={el.id} el={el} which={which} />
                    );
                })
                }
                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={next} disabled={lastVisible === movies.length - 1}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
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

const Card = ({ el, which }) => {
    const baseImg = 'https://image.tmdb.org/t/p/w200';
    return (
        <>
            <div className='relative'>
                <figure className='h-full mx-1 rounded-xl overflow-hidden shadow-2xl'>
                    <img src={`${baseImg}${el.poster_path}`} className='h-full w-full object-cover' alt="" />
                </figure>
                <p className={`absolute -bottom-3 -left-2 p-1 bg-black rounded-full ${which === 'top_rated' ? '' : 'hidden'}`}>{parseFloat(el.vote_average.toFixed(1))}</p>
            </div>
        </>
    )
}

export default ListMovies