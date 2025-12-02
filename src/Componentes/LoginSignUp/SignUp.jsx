import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './SignUpStyle.css'; 
import authService from '../../services/authService';

function SignUp() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    estado: '',
    cidade: '',
    email: '',
    senha: '',
    senhaRepetida: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null); 

    if (formData.senha !== formData.senhaRepetida) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true); 

    try {
      const response = await authService.register(
        `${formData.nome} ${formData.sobrenome}`, 
        formData.email,
        formData.senha,
        `${formData.cidade} - ${formData.estado}` 
      );

      if (response.data && response.data.token) {

        localStorage.setItem('userToken', response.data.token);
        
        setLoading(false);
        alert("Cadastro realizado com sucesso!");
        navigate('/feed');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Ocorreu um erro no cadastro.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form-wrapper">

        <Link to="/login" className="back-link">‹ Voltar para o Login</Link>

        <h1>Cadastro</h1>
        
        {error && <p className="form-error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="primeiro-nome">Primeiro nome:</label>
            <input 
              type="text" 
              id="primeiro-nome" 
              name="nome" 
              value={formData.nome} 
              onChange={onChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input 
              type="text" 
              id="sobrenome" 
              name="sobrenome" 
              value={formData.sobrenome}
              onChange={onChange}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado (sigla):</label>
              <input 
                type="text" 
                id="estado" 
                name="estado" 
                value={formData.estado}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade:</label>
              <input 
                type="text" 
                id="cidade" 
                name="cidade" 
                value={formData.cidade}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={onChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              value={formData.senha}
              onChange={onChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="repetir-senha">Repetir senha:</label>
            <input 
              type="password" 
              id="repetir-senha" 
              name="senhaRepetida" 
              value={formData.senhaRepetida}
              onChange={onChange}
              required 
            />
          </div>

           <div className="checkbox-group">
             <input type="checkbox" id="terms-consent" name="terms-consent" required />
             <label htmlFor="terms-consent">
               <b>Eu li e concordo com os Termos de Uso</b>
             </label>
           </div>
          
          <button type="submit" className="cadastro-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default SignUp;