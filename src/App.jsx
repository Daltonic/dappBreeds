import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Details from './pages/Details'
import Collections from './pages/Collections'
import Lab from './pages/Lab'
import { isWalletConnected } from './services/blockchain'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      await isWalletConnected()
    }

    fetchData()
  }, [])

  return (
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
  )
}

export default App
