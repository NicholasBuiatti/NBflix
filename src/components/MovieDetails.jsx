import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGlobalStore } from '../store';
import PropTypes from 'prop-types';

function MovieDetails({ movie, setMovie, type }) {
    const baseImg = 'https://image.tmdb.org/t/p/w1280';
    const [isOpen, setIsOpen] = useState(true);
    const [isChangeButton, setIsChangeButton] = useState(false)
    //DESTRUTTURO L'HOOK PERSONALIZZATO PER PRENDERE ITEMS E LA FUNZIONE ADDITEMS
    const { items, addItem, removeItem, reloadFromLocalStorage } = useGlobalStore();

    // CONTROLLA SE IL FILM è SALVATO GIà NELLO STORAGE
    useEffect(() => {
        reloadFromLocalStorage()
        if (items.some(item => item.id === movie.id)) {
            setIsChangeButton(true)
        } else {
            setIsChangeButton(false);
        }
    }, [items, movie])

    // MANIPOLAZIONE VOTO PER CREARE UN ARRAY CHE POSSO TRASFORMARE IN STELLE
    const truncated = parseFloat(movie.vote_average.toFixed(1));
    const rounded = Math.round(truncated * 2) / 2;
    const fullStars = Math.floor(rounded) / 2;
    const hasHalfStar = rounded % 1 !== 0;

    // FUNZIONE BASE PER INVERTIRE LA DATA
    function invertDate(date) {
        const parts = date.split("-");
        const inverted = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return inverted;
    }

    const closeDetails = () => {
        setIsOpen(false);
        setTimeout(() => { //SETTIMEOUT PER ASPETTARE LA FINE DELL'ANIMAZIONE
            setMovie(null);
        }, 1000);
    };

    const addWatchList = () => {
        if (!items.includes(movie)) {
            addItem(movie); //AGGIUNGI IL FILM ALLO STORAGE PRENDENDO LA FUNZIONE DLL'HOOK PERSONALIZZATO
            console.log('film aggiunto', items);
        }

    }
    const handleRemoveItem = (movieId) => {
        removeItem(movieId); // RIMUOVI L'ELEMENTO CONFRONTANDO IL MOVIE.ID
        reloadFromLocalStorage();
    };

    return (
        <motion.div
            initial={{
                height: 0,
            }}
            animate={{
                height: isOpen ? "75vh" : 0,
            }}
            transition={{
                duration: 1,
                ease: "easeInOut",
            }}
            className="fixed top-0 left-0 w-full z-40 text-white bg-black/80"
        >
            <button
                type="button"
                onClick={closeDetails}
                className="absolute top-2 right-2 z-50 text-black dark:text-white bg-gradient-to-r from-red-300 via-red-400 to-red-500 dark:from-red-700 dark:via-red-800 dark:to-red-900 hover:bg-gradient-to-br dark:hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-700/50 rounded-lg text-sm px-2 py-1"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
            <img
                src={`${baseImg}${movie.backdrop_path}`}
                className="absolute w-full h-full object-cover"
                alt={movie.title}
            />

            {
                isOpen &&
                <div className='absolute top-2 left-2 bg-black/50 p-2 rounded-2xl'>

                    {
                        type == 'movie' ?
                            <h1 className="text-4xl">
                                {movie.title.toUpperCase()}
                            </h1>
                            :
                            <h1
                                className="text-4xl"
                            >
                                {movie.name.toUpperCase()}
                            </h1>

                    }

                    {/* Stelle piene */}
                    {Array.from({ length: fullStars }, (_, i) => (
                        <i
                            key={i}
                            className="fa-solid fa-star text-yellow-300"
                        >
                        </i>
                    ))}
                    {hasHalfStar &&
                        <i
                            className="fa-solid fa-star-half text-yellow-300"
                        >
                        </i>
                    }
                    <p>Lingua originale: {movie.original_language}</p>
                    {
                        type == 'movie' ?
                            <p>
                                Data di uscita: {invertDate(movie.release_date)}
                            </p>
                            :
                            <p>
                                Data di uscita: {invertDate(movie.first_air_date)}
                            </p>


                    }
                    {
                        isChangeButton ?
                            <button onClick={() => handleRemoveItem(movie.id)} className='rounded-full w-10 p-1 mx-auto mt-2 bg-red-500/80 hover:bg-red-400/80'>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            :
                            <button onClick={addWatchList} className='rounded-full w-10 p-1 mx-auto mt-2 bg-red-500/80 hover:bg-red-400/80'>
                                <i className="fa-solid fa-plus text-xl"></i>
                            </button>
                    }
                </div>
            }
            <div
                className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"
            >
            </div>
            <div
                className="absolute bottom-2 max-h-48 overflow-auto p-2">
                <p
                    className="text-xl"
                >
                    {movie.overview}
                </p>

            </div>
        </motion.div>
    );
}

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        vote_average: PropTypes.number.isRequired,
        backdrop_path: PropTypes.string.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        original_language: PropTypes.string.isRequired,
        release_date: PropTypes.string,
        first_air_date: PropTypes.string,
        overview: PropTypes.string.isRequired,
    }).isRequired,
    setMovie: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieDetails