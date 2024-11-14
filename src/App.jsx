import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import Navbar from './components/Navbar';
import './App.css';

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <div className="flex h-[calc(100vh-3rem)] md:h-full md:w-10/12 max-w-screen-xl">
          <AppRouter />
        </div>
      </Router>


    </>
  )
}

export default App
