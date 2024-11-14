
import { motion } from 'framer-motion';
import Menu from './Menu';
import title from '../../assets/NBflix.png';
const OffCanvasMenu = ({ setIsSideMenu }) => {
    const closeSideMenu = () => {
        setIsSideMenu(false)
    }

    return (
        <>
            <motion.div
                className="fixed md:hidden top-0 left-0 z-50 h-screen overflow-y-auto w-full sm:w-6/12 bg-gradient-to-b from-white to-rose-100 dark:from-black dark:to-red-900 text-center sm:text-start text-xl sm:text-base"
                initial={{ x: '-100%' }} // Inizializza a sinistra (fuori schermo)
                animate={{ x: 0 }} // Scivola nella vista
                exit={{ x: '-100%' }} // Fuori schermo a sinistra
                transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Transizione fluida
            >
                <figure className='w-60 mx-auto p-4'>
                    <img src={title} alt="Logo" />
                </figure>
                <hr />

                <button type="button" onClick={closeSideMenu} className="absolute top-2 right-2 text-black dark:text-white bg-gradient-to-r from-red-300 via-red-400 to-red-500 dark:from-red-700 dark:via-red-800 dark:to-red-900 hover:bg-gradient-to-br dark:hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-700/50 rounded-lg text-sm px-2 py-1">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <Menu />
            </motion.div>
        </>
    )
}

export default OffCanvasMenu