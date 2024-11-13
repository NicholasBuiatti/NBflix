import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import OffCanvasMenu from './NavbarComponent/OffCanvas';
import Menu from './NavbarComponent/Menu';
import title from '../assets/NBflix.png';
const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSideMenu, setIsSideMenu] = useState(false);
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
        setIsSideMenu(true);
    };


    return (
        <nav className='flex md:flex-col w-screen h-12 md:w-60 md:h-full border-r border-r-gray-100 dark:border-r-gray-950'>
            <figure className='hidden md:block min-w-24 p-3'>
                <img src={title} alt="" />
                <hr />
            </figure>
            <button onClick={openSideMenu} className='md:hidden'><i className="fa-solid fa-bars text-2xl"></i></button>

            <section className='pt-6 hidden md:block justify-start text-lightText dark:text-darkText'>
                <Menu />
            </section>

            {/* DarkMode button */}
            <div className='rounded-full p-1 mt-auto mb-2 ml-auto md:mx-auto w-16 h-8 bg-primary dark:bg-primaryDark'>
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
                    <OffCanvasMenu setIsSideMenu={setIsSideMenu} />
                )}
            </AnimatePresence>
        </nav>
    )
}


export default Navbar