
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import authService from '../../services/authService';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { email, senha } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authService.login(email, senha);

      if (response.data && response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        
        setLoading(false);
        navigate('/feed'); 
      }
      
    } catch (err) {
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
        
        {error && <p className="form-error-message">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={onChange} 
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