import { useState, useEffect } from 'react'

const Navbar = () => {
    const [isDarkMode, isSetDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const toggleDarkMode = () => {
        isSetDarkMode(!isDarkMode);
    };

    return (
        <nav className='p-2 w-screen h-12 md:w-2/12 md:h-full border-r border-r-gray-100 dark:border-r-gray-950'>
            <h1 className='text-4xl hidden md:block'>NBflix</h1>
            <button className='p-2 bg-orange-200' onClick={toggleDarkMode}>Darkmode</button>


            <i className="fa-solid fa-bars text-2xl md:hidden"></i>


        </nav>
    )
}


export default Navbar