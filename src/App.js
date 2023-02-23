import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Header from './components/Header.jsx'
import Coins from './components/Coins.jsx'
import CoinDetails from './components/CoinDetails.jsx'
import Exchanges from './components/Exchanges.jsx'
import Footer from './components/Footer.jsx'
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Coins/>} />
        <Route path='/coin/:id' element={<CoinDetails/>} />
        <Route path='/exchange' element={<Exchanges/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
