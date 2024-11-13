import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import title from '../assets/NBflix.png';
const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSideMenu, SetIsSideMenu] = useState(false);
    const location = useLocation();
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
        <nav className='flex md:flex-col w-screen h-12 md:w-40 lg:w-60 md:h-full border-r border-r-gray-100 dark:border-r-gray-950'>
            <figure className='hidden md:block min-w-24'>
                <img src={title} alt="" />
                <hr />
            </figure>
            <button onClick={openSideMenu} className='md:hidden'><i className="fa-solid fa-bars text-2xl"></i></button>

            <section className='pt-6 hidden md:block justify-start text-lightText dark:text-darkText'>
                <div className='py-3'>
                    <p className='pb-3 pl-6 text-gray-600 dark:text-gray-400'>Menù</p>
                    <ul>
                        {
                            routes.filter(el => el.label == 'Home' || el.label == 'Coming Soon' || el.label == 'WatchList').map(route => {
                                return (
                                    <Link key={route.id} to={route.path}>
                                        <li className={`pl-12 hover:border-l-orange-600 hover:border-l-2 ${location.pathname === route.path ? 'text-xl border-l-orange-600 border-l-2' : ''}`}>{route.label}</li>
                                    </Link>
                                )
                            })

                        }
                    </ul>
                </div>
                <div className='py-3'>
                    <p className='pb-3 pl-6 text-gray-600 dark:text-gray-400'>Social</p>
                    <ul>
                        <li className='pl-12 hover:border-l-orange-600 hover:border-l-2'>Friends</li>
                        <li className='pl-12 hover:border-l-orange-600 hover:border-l-2'>Parties</li>
                    </ul>
                </div>
                <div className='py-3'>
                    <p className='pb-3 pl-6 text-gray-600 dark:text-gray-400'>General</p>
                    <ul>
                        <li className='pl-12 hover:border-l-orange-600 hover:border-l-2'>Settings</li>
                        <li className='pl-12 hover:border-l-orange-600 hover:border-l-2'>Log out</li>
                    </ul>
                </div>
            </section>

            <div className='rounded-full p-1 mt-auto ml-auto md:mx-auto w-16 h-8 bg-primary dark:bg-primaryDark'>
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