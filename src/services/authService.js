import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth/';
const register = (nome, email, senha, cidade) => {
  return axios.post(API_URL + 'register', {
    nome,
    email,
    senha,
    cidade,
  });
};

const login = (email, senha) => {
  return axios.post(API_URL + 'login', {
    email,
    senha,
  });
};

const authService = {
  register,
  login,
};

export default authService;