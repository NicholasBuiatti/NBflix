import { routes } from '../../routes';
import { Link, useLocation } from 'react-router-dom';
const Menu = () => {
    const location = useLocation()
    return (
        <>
            <div className='py-3'>
                <p className='pb-3 sm:pl-6 text-gray-600 dark:text-gray-400'>Menù</p>
                <ul>
                    {
                        routes.filter(el => el.label == 'Home' || el.label == 'Coming Soon' || el.label == 'WatchList').map(route => {
                            return (
                                <Link key={route.id} to={route.path}>
                                    <li className={`sm:pl-12 hover:border-l-orange-600 hover:border-l-2 ${location.pathname === route.path ? 'text-xl border-l-orange-600 border-l-2 underline sm:no-underline' : ''}`}>{route.label}</li>
                                </Link>
                            )
                        })

                    }
                </ul>
            </div>
            <div className='py-3'>
                <p className='pb-3 sm:pl-6 text-gray-600 dark:text-gray-400'>Social</p>
                <ul>
                    <li className='sm:pl-12 cursor-pointer hover:border-l-orange-600 hover:border-l-2'>Friends</li>
                    <li className='sm:pl-12 cursor-pointer hover:border-l-orange-600 hover:border-l-2'>Parties</li>
                </ul>
            </div>
            <div className='py-3'>
                <p className='pb-3 sm:pl-6 text-gray-600 dark:text-gray-400'>General</p>
                <ul>
                    <li className='sm:pl-12 cursor-pointer hover:border-l-orange-600 hover:border-l-2'>Settings</li>
                    <li className='sm:pl-12 cursor-pointer hover:border-l-orange-600 hover:border-l-2'>Log out</li>
                </ul>
            </div>
        </>
    )
}

export default Menu