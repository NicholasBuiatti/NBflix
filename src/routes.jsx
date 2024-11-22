import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';
import WatchList from './pages/WatchList';
import Error from './pages/Error';

export const routes = [
    {
        id: 1,
        path: '/',
        element: <Home />,
        label: 'Home',
    },
    {
        id: 2,
        path: '/comingSoon',
        element: <ComingSoon />,
        label: 'Coming Soon',
    },
    {
        id: 3,
        path: '/watchList',
        element: <WatchList />,
        label: 'WatchList',
    },
    {
        path: '*',
        element: <Error />
    },
]