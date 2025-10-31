import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PHome from './Componentes/Prop/PHome'; 
import Login from './Componentes/LoginSignUp/Login';
import SignUp from './Componentes/LoginSignUp/SignUp';
import PaginaInicial from './Componentes/Inicio/PaginaInicial/PaginInicial';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PHome />} /> 
        
        <Route path="/login" element={<Login />} />  
        
        <Route path="/cadastro" element={<SignUp />} />

        <Route path="/feed" element={<PaginaInicial />} />

      </Routes>
    </Router>
  );
}

export default App;