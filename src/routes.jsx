import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/comum.css'
import Login from './pages/login/login'

import OrdemServico from './pages/ordemservico/ordemservico'
import Mecanico from './pages/mecanico/mecanico'
import NotFound from './components/notfound/notfound'


const Rotas = () => {
    return ( 
      <Router basename="/app/oficina">
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<OrdemServico />} />
          <Route path="/mecanico" element={<Mecanico />} />
          

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }
  
export default Rotas;