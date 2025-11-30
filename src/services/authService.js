import axios from 'axios';

// 1. Define a URL base da sua API (o seu backend)
//    (Nós rodamos o backend na porta 5000)
const API_URL = 'http://localhost:5000/api/auth/';

// 2. Função para "Registrar"
//    Ela envia os dados (nome, email, etc.) para o backend
const register = (nome, email, senha, cidade) => {
  // Faz uma requisição POST para http://localhost:5000/api/auth/register
  return axios.post(API_URL + 'register', {
    nome,
    email,
    senha,
    cidade,
  });
};

// 3. Função para "Logar"
//    Ela envia email e senha para o backend
const login = (email, senha) => {
  // Faz uma requisição POST para http://localhost:5000/api/auth/login
  return axios.post(API_URL + 'login', {
    email,
    senha,
  });
};

// 4. Exporta as funções para que nossos componentes possam usá-las
const authService = {
  register,
  login,
};

export default authService;