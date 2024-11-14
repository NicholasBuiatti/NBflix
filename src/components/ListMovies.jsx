import { useState, useEffect } from 'react'
import axios from 'axios'
const ListMovies = ({ type, apiKey }) => {
    const [movies, setMovies] = useState([])
    const [firstVisible, setFirstVisible] = useState(0)
    const [lastVisible, setLastVisible] = useState(5)



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

    return (
        <>
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
        </>
    )
}

const Card = ({ el, type }) => {
    const baseImg = 'https://image.tmdb.org/t/p/w200';
    return (
        <>
            <div className='relative'>
                <figure>
                    <img src={`${baseImg}${el.poster_path}`} alt="" />
                </figure>


            </div>
        </>
    )
}

export default ListMovies