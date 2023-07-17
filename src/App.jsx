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
import ChatButton from './components/ChatButton'
import { checkAuthState } from './services/chat'
import ChatList from './components/ChatList'
import Spacer from './components/Spacer'
import Chat from './pages/Chat'
import { useGlobalState } from './store'

const App = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  useEffect(() => {
    const fetchData = async () => {
      await isWalletConnected()
      await loadData()
      await checkAuthState()
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Spacer spaces={1} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nft/:id" element={<Details />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/chats/:id" element={<Chat />} />
      </Routes>
      <Spacer spaces={7} />
      <Footer />
      {connectedAccount && <ChatButton />}
      <ChatList />

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
