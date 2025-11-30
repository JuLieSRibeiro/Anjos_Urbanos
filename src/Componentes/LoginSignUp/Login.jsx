// src/Componentes/LoginSignUp/Login.jsx

// 1. Importe 'useState'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginStyle.css';

// 2. Importe o nosso serviço de autenticação
import authService from '../../services/authService';

function Login() {
  const navigate = useNavigate();

  // 3. Crie 'useState' para os campos do formulário
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  
  // 4. Crie estados para 'error' e 'loading'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { email, senha } = formData;

  // 5. Função 'onChange' para atualizar o estado
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // 6. ATUALIZE A FUNÇÃO 'handleLogin'
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 7. CHAMA A API DO BACKEND
      const response = await authService.login(email, senha);

      // 8. SE TIVER SUCESSO (Backend respondeu)
      if (response.data && response.data.token) {
        // 9. SALVA O "PASSE DE LOGIN" (TOKEN) NO NAVEGADOR
        localStorage.setItem('userToken', response.data.token);
        
        setLoading(false);
        navigate('/feed'); // Redireciona para o feed
      }
      
    } catch (err) {
      // 10. SE O BACKEND DER ERRO (ex: "Email ou senha inválidos")
      const errorMessage = err.response?.data?.message || "Ocorreu um erro no login.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <p>Preencha seus dados:</p>
        
        {/* 11. Mostra a mensagem de erro, se ela existir */}
        {error && <p className="form-error-message">{error}</p>}
        
        {/* 12. Conecta o 'onSubmit' e os inputs ao 'useState' */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" // O 'name' deve ser igual à chave no 'useState'
              value={email} // Amarrado ao estado
              onChange={onChange} // Amarrado à função
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha:</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              value={senha}
              onChange={onChange}
              required 
            />
          </div>
          
          {/* 13. Desabilita o botão enquanto estiver "carregando" */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Logar'}
          </button>
        </form>
        
        <a href="#" className="forgot-password">Esqueci a senha.</a>
        <p className="signup-link">
          Não tem uma conta?{' '}
          <Link to="/cadastro">Cadastre-se</Link> 
        </p>
      </div>
    </div>
  );
}

export default Login;