import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import WhoAmI from './pages/WhoAmI'
import ArtAndMusic from './pages/ArtAndMusic'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/who-am-i" replace />} />
          <Route path="/who-am-i" element={<WhoAmI />} />
          <Route path="/artandmusic" element={<ArtAndMusic />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

