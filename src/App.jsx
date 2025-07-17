
import './App.css'
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div className='entire-page'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/about' element={<AboutPage />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
