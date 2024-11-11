import Navbar from './components/Navbar';
import Rightbar from './components/Rightbar';
import SectionFilms from './components/SectionFilms';
import './App.css';

function App() {


  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-3rem)] md:h-full md:w-10/12">
        <SectionFilms />
        <Rightbar />
      </div>

    </>
  )
}

export default App
