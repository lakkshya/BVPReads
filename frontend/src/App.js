import './App.css';
import PhoneNavbar from './components/PhoneNavbar';
import Navbar from './components/Navbar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Books from './pages/Books';
import AllBooks from './pages/AllBooks';
import Bag from './pages/Bag';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <PhoneNavbar />
          <div className="row flex-nowrap my-navbar">
            <Navbar />
            <div className="col flex-grow-1 mx-3">
              <Topbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/resources/books' element={<Books />} />
                <Route path='/resources/books/allbooks' element={<AllBooks />} />
                <Route path='/bag' element={<Bag />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
