import { Routes, Route, } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './pages/Home'
import Details from './pages/Details';
import Collections from './pages/Collections';
import Lab from './pages/Lab';


function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details/>} />
          <Route path="/collections" element={<Collections/>} />
          <Route path="/lab" element={<Lab/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
