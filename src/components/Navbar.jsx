import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSideMenu, SetIsSideMenu] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const openSideMenu = () => {
        SetIsSideMenu(true);
    };
    const closeSideMenu = () => {
        SetIsSideMenu(false)
    }


    return (
        <nav className='flex justify-between p-2 w-screen h-12 md:w-2/12 md:h-full border-r border-r-gray-100 dark:border-r-gray-950'>
            <h1 className='text-4xl hidden md:block'>NBflix</h1>
            <button onClick={openSideMenu} className='md:hidden'><i className="fa-solid fa-bars text-2xl"></i></button>


            <button className='p-2 bg-orange-200' onClick={toggleDarkMode}>Darkmode</button>




            {/* offcanvas menu */}
            <AnimatePresence>
                {isSideMenu && (
                    <OffCanvasMenu closeSideMenu={closeSideMenu} />
                )}
            </AnimatePresence>
        </nav>
    )
}

const OffCanvasMenu = ({ closeSideMenu }) => {

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 z-10 h-screen p-4 overflow-y-auto w-full sm:w-6/12 border-r bg-gray-400 dark:bg-gray-800"
                initial={{ x: '-100%' }} // Inizializza a sinistra (fuori schermo)
                animate={{ x: 0 }} // Scivola nella vista
                exit={{ x: '-100%' }} // Fuori schermo a sinistra
                transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Transizione fluida
            >
                <button className="p-2" onClick={closeSideMenu}>
                    X
                </button>
                <h1>ciao</h1>
            </motion.div>
        </>
    )
}

export default Navbar