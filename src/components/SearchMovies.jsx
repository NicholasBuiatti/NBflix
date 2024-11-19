import { useState, useEffect } from 'react'
import { Card } from './ListMovies';
import axios from 'axios';


const SearchMovies = ({ type, setIsSearchTab, apiKey, onMovieSelect }) => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const searchBar = (e) => {
        setSearch(e.target.value)
    }

    const getSearchMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${search}&language=it&page=1`)
            const movies = response.data.results
            setMovies(movies)
            console.log('ecco la searchbar', movies);


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getSearchMovies();
    }, [search, type])

    return (
        <>
            <input type="text" className='dark:bg-slate-900 px-2 py-1 rounded-full' value={search} onChange={searchBar} placeholder='Search' />
            <button type='button' onClick={() => setIsSearchTab(false)} className="absolute top-4 right-3 text-black dark:text-white bg-gradient-to-r from-red-300 via-red-400 to-red-500 dark:from-red-700 dark:via-red-800 dark:to-red-900 hover:bg-gradient-to-br dark:hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-700/50 rounded-lg text-sm px-2 py-1">
                <i className="fa-solid fa-xmark"></i>
            </button>

            <div className='flex flex-wrap gap-2 justify-center mt-3 overflow-auto' style={{ height: 'calc(100% - 5rem)' }}>
                {movies.map(el => {
                    return (
                        <Card key={el.id} el={el} type={type} onClick={() => onMovieSelect(el)} />
                    )
                })}

            </div>
        </>
    )
}

export default SearchMovies