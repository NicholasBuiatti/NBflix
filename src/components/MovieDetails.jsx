


function MovieDetails({ movie, onClose, type }) {
    const baseImg = 'https://image.tmdb.org/t/p/w1280';


    const truncated = parseFloat(movie.vote_average.toFixed(1));
    const rounded = Math.round(truncated * 2) / 2;
    const fullStars = Math.floor(rounded) / 2;
    const hasHalfStar = rounded % 1 !== 0;

    function invertDate(date) {
        const parts = date.split("-");
        const inverted = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return inverted;
    }

    return (
        <div className="fixed top-0 left-0 h-3/4 w-full z-40 text-white bg-black/80">
            <button type="button" onClick={onClose} className="absolute top-2 right-2 z-50 text-black dark:text-white bg-gradient-to-r from-red-300 via-red-400 to-red-500 dark:from-red-700 dark:via-red-800 dark:to-red-900 hover:bg-gradient-to-br dark:hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-700/50 rounded-lg text-sm px-2 py-1">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <img src={`${baseImg}${movie.backdrop_path}`} className="absolute w-full h-full object-cover" alt={movie.title} />

            <div className='absolute top-2 left-2 bg-black/50 p-2 rounded-2xl'>

                {
                    type == 'movie' ?
                        <h1 className="text-4xl">{movie.title.toUpperCase()}</h1>
                        :
                        <h1 className="text-4xl">{movie.name.toUpperCase()}</h1>

                }

                {/* Stelle piene */}
                {Array.from({ length: fullStars }, (_, i) => (
                    <i key={i} className="fa-solid fa-star text-yellow-300"></i>
                ))}
                {hasHalfStar && <i className="fa-solid fa-star-half text-yellow-300"></i>}
                <p>Lingua originale: {movie.original_language}</p>
                {
                    type == 'movie' ?
                        <p>Data di uscita: {invertDate(movie.release_date)}</p>
                        :
                        <p>Data di uscita: {invertDate(movie.first_air_date)}</p>


                }
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-2 max-h-48 overflow-auto p-2">
                <p className="text-xl">{movie.overview}</p>

            </div>
        </div>
    );
}

export default MovieDetails