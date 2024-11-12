import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import ComingSoon from './pages/ComingSoon';
import WatchList from './pages/WatchList';
import Error from './pages/Error';

export const routes = [
    {
        id: 1,
        path: '/',
        element: <Home />
    },
    {
        id: 2,
        path: '/movies',
        element: <Movies />
    },
    {
        id: 3,
        path: '/series',
        element: <Series />
    },
    {
        id: 4,
        path: '/comingSoon',
        element: <ComingSoon />
    },
    {
        id: 5,
        path: '/watchList',
        element: <WatchList />
    },
    {
        path: '*',
        element: <Error />
    },
]