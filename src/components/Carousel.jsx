import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Carousel = ({ type, apiKey }) => {
    const [foregroundMovies, setForegroundMovies] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 10;
    const intervalRef = useRef(null);
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const getforegroundMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&with_production_countries=US,IT,GB&with_original_language=en&language=it-IT&page=1`)
            const movies = response.data.results
            console.log(movies);
            setForegroundMovies(movies)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getforegroundMovies();
        // Se c'è un intervallo attivo, lo fermiamo
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Crea un nuovo intervallo e memorizza l'ID
        intervalRef.current = setInterval(nextSlide, 5000);

        // Funzione di cleanup per fermare l'intervallo quando il componente viene smontato o 'type' cambia
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [type])

    return (
        <div id="default-carousel" className="relative w-full p-4" data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {foregroundMovies.filter((_, index) => index < totalSlides).map((movie, index) => (
                    <motion.div
                        key={index}
                        className={`${currentSlide === index ? 'block' : 'hidden'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        data-carousel-item
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt={`Slide ${index + 1}`}
                        />

                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                        {
                            type === 'movie' ?
                                <h1 className='absolute text-3xl bottom-10 left-5 text-white'>{movie.title}</h1>
                                :
                                <h1 className='absolute text-3xl bottom-10 left-5 text-white'>{movie.name}</h1>
                        }
                    </motion.div>
                ))}
            </div>

            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-10 left-1/2 space-x-3 rtl:space-x-reverse">
                {[...Array(totalSlides)].map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-orange-400' : 'bg-gray-400'}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

        </div>
    );
};

export default Carousel