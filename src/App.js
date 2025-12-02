import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PHome from './Componentes/Prop/PHome'; 
import Login from './Componentes/LoginSignUp/Login';
import SignUp from './Componentes/LoginSignUp/SignUp';
import PaginaInicial from './Componentes/Inicio/PaginaInicial/PaginInicial';
import PaginaMensagens from './Componentes/Inicio/PaginaMensagens/PaginaMensagens';
import PaginaNotificacoes from './Componentes/Inicio/PaginaNotificacoes/PaginaNotificacoes';
import PaginaPerfil from './Componentes/Inicio/PaginaPerfil/PaginaPerfil';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<PHome />} /> 
        <Route path="/login" element={<Login />} />  
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/feed" element={<PaginaInicial />} />
        <Route path="/mensagens" element={<PaginaMensagens />} />
        <Route path="/notificacoes" element={<PaginaNotificacoes />} />
        <Route path="/perfil" element={<PaginaPerfil />} />

      </Routes>
    </Router>
  );
}

export default App;