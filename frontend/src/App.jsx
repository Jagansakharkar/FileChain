import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { UploadFile } from './pages/UploadFile';
import { AllFiles } from './pages/AllFiles';
import { Login } from './pages/Login'
import { AboutUs } from './pages/AboutUs';
import { Web3Provider } from './contexts/web3context';
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <>
      <Web3Provider>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/upload_file" element={<UploadFile />} />
            <Route path="/all_files" element={<AllFiles />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
          <Footer/>
        </BrowserRouter>

      </Web3Provider>
    </>
  );
}

export default App;