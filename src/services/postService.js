import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts/';
const getAllPosts = () => {
  return axios.get(API_URL);
};

const createPost = (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };

  return axios.post(API_URL, postData, config);
};

const addComment = (postId, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(API_URL + `${postId}/comment`, { text }, config);
};

const toggleLikeOnComment = (postId, commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.put(API_URL + `${postId}/comment/${commentId}/like`, {}, config);
};

const postService = {
  getAllPosts,
  createPost,
  addComment,
  toggleLikeOnComment,
};

export default postService;