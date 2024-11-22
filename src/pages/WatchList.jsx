import { useEffect } from "react";
import { useGlobalStore } from "../store";

const WatchList = () => {
    const baseImg = 'https://image.tmdb.org/t/p/w200';

    const { items, reloadFromLocalStorage } = useGlobalStore();


    // RICARICO LO STATO DI STORAGE AL MONTAGGIO
    useEffect(() => {
        reloadFromLocalStorage();
    }, []);

    return (
        <>
            <div className="flex">
                {
                    items.map((movie) => {
                        return (
                            <div key={movie.id} className='relative'>
                                <figure className='relative mx-1 rounded-xl overflow-hidden shadow-2xl cursor-pointer'>
                                    <img src={`${baseImg}${movie.poster_path}`} className='h-full w-full object-cover' alt="" />

                                </figure>
                            </div>
                        )
                    })
                }
            </div>

        </>
    );
};
export default WatchList