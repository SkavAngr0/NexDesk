import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Assets from './pages/Assets'
import Tickets from './pages/Tickets'
import KnowledgeBase from './pages/KnowledgeBase'
import Users from './pages/Users'
import Locations from './pages/Locations'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/users" element={<Users />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App