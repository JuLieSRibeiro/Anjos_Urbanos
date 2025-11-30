import axios from 'axios';

// 1. Define a URL base da sua API de posts
const API_URL = 'http://localhost:5000/api/posts/';

// --- FUNÇÕES DE API ---

/**
 * Busca todos os posts (Rota Pública)
 */
const getAllPosts = () => {
  // GET /api/posts/
  return axios.get(API_URL);
};

/**
 * Cria um novo post (Rota Protegida)
 * @param {object} postData - { type, mensagem, tags }
 * @param {string} token - O "passe de login" (JWT)
 */
const createPost = (postData, token) => {
  // 2. Cria o cabeçalho de autorização
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // É assim que o 'protect' nos reconhece
    },
  };

  // POST /api/posts/
  return axios.post(API_URL, postData, config);
};

/**
 * Adiciona um comentário a um post (Rota Protegida)
 * @param {string} postId - O ID do post
 * @param {string} text - O texto do comentário
 * @param {string} token - O "passe de login" (JWT)
 */
const addComment = (postId, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // POST /api/posts/:postId/comment
  return axios.post(API_URL + `${postId}/comment`, { text }, config);
};

/**
 * Curte/Descurte um comentário (Rota Protegida)
 * @param {string} postId - O ID do post
 * @param {string} commentId - O ID do comentário
 * @param {string} token - O "passe de login" (JWT)
 */
const toggleLikeOnComment = (postId, commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // PUT /api/posts/:postId/comment/:commentId/like
  return axios.put(API_URL + `${postId}/comment/${commentId}/like`, {}, config);
};


// 5. Exporta as funções
const postService = {
  getAllPosts,
  createPost,
  addComment,
  toggleLikeOnComment,
};

export default postService;