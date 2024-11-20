import { useEffect } from 'react'
import Sfondo from '../assets/ComingSoon.jpg'
import axios from 'axios'


const ComingSoon = () => {

    return (
        <div className='w-full'>
            <figure className='h-full w-full relative'>
                <img src={Sfondo} className='absolute object-cover object-bottom h-full w-full ' alt="" />
                <div className="absolute flex flex-col items-center text-center w-full h-full space-y-4 py-8 bg-gray-900/70 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                        Prossimamente al Cinema
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        Scopri i film più attesi in arrivo e le ultime uscite da non perdere! Resta aggiornato sulle novità e preparati a vivere grandi emozioni sul grande schermo.
                    </p>
                </div>
            </figure>
        </div>
    )
}

export default ComingSoon