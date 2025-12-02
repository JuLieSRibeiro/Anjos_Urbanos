const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const generateToken = (id) => {
  
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = asyncHandler(async (req, res) => {
  
  const { nome, email, senha, cidade } = req.body;

  
  if (!nome || !email || !senha) {
    res.status(400);
    throw new Error('Por favor, adicione todos os campos');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Usuário já existe');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(senha, salt);

  const user = await User.create({
    nome,
    email,
    cidade,
    senha: hashedPassword,
  });
  
  if (user) {
    res.status(201).json({
      _id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user._id), 
    });
  } else {
    res.status(400);
    throw new Error('Dados de usuário inválidos');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  
  const { email, senha } = req.body;
  
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(senha, user.senha))) {
    
    res.json({
      _id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    
    res.status(400);
    throw new Error('Email ou senha inválidos');
  }
});

module.exports = {
  registerUser,
  loginUser,
};