import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import title from '../assets/NBflix.png';
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
        <nav className='flex justify-between md:flex-col p-2 w-screen h-12 md:w-40 lg:w-60 md:h-full border-r border-r-gray-100 dark:border-r-gray-950'>
            <figure className='hidden md:block  min-w-24'>
                <img src={title} alt="" />
            </figure>
            <button onClick={openSideMenu} className='md:hidden'><i className="fa-solid fa-bars text-2xl"></i></button>




            <section>
                <div>
                    <p>Menu</p>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/watchList'}>Watchlist</Link></li>
                        <li><Link to={'/comingSoon'}>Coming Soon</Link></li>
                    </ul>
                </div>
                <div>
                    <p>Social</p>
                    <ul>
                        <li>Friends</li>
                        <li>Parties</li>
                    </ul>
                </div>
                <div>
                    <p>General</p>
                    <ul>
                        <li>Settings</li>
                        <li>Log out</li>
                    </ul>
                </div>
            </section>

            <div className='rounded-full p-1 mx-0 md:mx-auto w-16 h-8 bg-primary dark:bg-primaryDark'>
                <motion.button
                    className='rounded-full bg-white w-6/12 h-6 text-lightText'
                    onClick={toggleDarkMode}
                    // Usa la proprietà animate per muovere il bottone
                    animate={{
                        x: isDarkMode ? '100%' : '0%', // Se true x si trova a 100%
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {
                        isDarkMode ?
                            <i className="fa-regular fa-moon"></i>
                            :
                            <i className="fa-regular fa-sun"></i>
                    }
                </motion.button>
            </div>


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
                className="fixed md:hidden top-0 left-0 z-10 h-screen p-4 overflow-y-auto w-full sm:w-6/12 border-r bg-gray-100 dark:bg-gray-800"
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