import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import { MainProvider } from './Providers'
import { Home, AboutUs, Register } from './pages'

function App() {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="aboutus" element={<AboutUs />} />
          </Route>
        </Routes>
      </MainProvider>
    </BrowserRouter>
  )
}

export default App
