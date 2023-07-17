import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Details from './pages/Details'
import Collections from './pages/Collections'
import Lab from './pages/Lab'
import { useEffect, useState } from 'react'
import { isWalletConnected } from './services/blockchain'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  const WalletConnectionStatus = async ()=> {
    await isWalletConnected()
    .then(()=>setLoaded(true))
  }

  useEffect(()=> {
      WalletConnectionStatus() 
      return ()=> {
        return null
      }
  },[])

  return loaded ? (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-10" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nft/:id" element={<Details />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/lab" element={<Lab />} />
      </Routes>
      <Footer />
    </div>
  ) : null;
} 
export default App
