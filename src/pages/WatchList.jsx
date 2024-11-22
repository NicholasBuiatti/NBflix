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
            {/* Header Section */}
            <div className="py-8 text-center w-full">
                <h1 className="text-5xl font-bold text-red-600 mb-4">Film Salvati</h1>
                <p className="text-lg max-w-3xl mx-auto px-4">
                    Scopri la tua selezione personalizzata di film salvati. Esplora i titoli che hai scelto e preparati per la tua prossima maratona cinematografica!
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-2">

                {
                    items.map((movie) => {
                        return (
                            <>
                                <div key={movie.id} className="relative group overflow-hidden rounded-xl">
                                    <figure className="relative h-full shadow-xl rounded-xl overflow-hidden cursor-pointer transition-transform transform group-hover:scale-105">
                                        <img src={`${baseImg}${movie.poster_path}`} className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-75" alt={movie.title} />

                                        <div className="absolute flex-col inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                            <p className="text-white text-2xl font-bold">Play</p>

                                            <div className="text-white font-semibold text-lg bg-black bg-opacity-50 px-2 py-1 rounded-lg mt-5">
                                                {
                                                    movie.title || movie.name
                                                }
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </>

                        );
                    })
                }
            </div>

        </>
    );
};
export default WatchList