import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Details from './pages/Details'
import Collections from './pages/Collections'
import Lab from './pages/Lab'
import { isWalletConnected, loadData } from './services/blockchain'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      await isWalletConnected()
      await loadData()
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

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
