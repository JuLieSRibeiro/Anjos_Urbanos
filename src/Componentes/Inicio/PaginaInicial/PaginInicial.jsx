import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../../../services/postService';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import ProfileCard from '../ProfileCard/ProfileCard';
import CommentBox from '../CommentBox/CommentBox';
import PostList from '../PostList/PostList'; 
import PostModal from '../PostModal/PostModal'; 
import './PaginaInicial.css';

const defaultFilters = {
  modo: 'todos', categoria: '', estado: '', cidade: ''
};

function PaginaInicial() {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setAllPosts(response.data); 
        setLoading(false);
      } catch (err) {
        setError("Não foi possível carregar o feed.");
        setLoading(false);
      }
    };

    fetchPosts(); 
  }, [userToken, navigate]);

  const handleAddPost = async (newPostData) => {
    try {
      const response = await postService.createPost(newPostData, userToken);
      setAllPosts([response.data, ...allPosts]);
      closeModal();
    } catch (err) {
      alert("Erro ao criar o post. Tente novamente.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const displayedPosts = allPosts.filter(post => {
    const filtersLower = {
      categoria: filters.categoria.toLowerCase(),
      estado: filters.estado.toLowerCase(),
      cidade: filters.cidade.toLowerCase()
    };
    if (filters.modo === 'pedidos' && post.type !== 'pedido') return false; 
    if (filters.modo === 'ofertas' && post.type !== 'oferta') return false; 
    if (filtersLower.categoria) {
      const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(filtersLower.categoria));
      if (!tagMatch) return false;
    }
    const postLocationLower = post.cidade.toLowerCase();
    if (filtersLower.estado && !postLocationLower.includes(filtersLower.estado)) return false; 
    if (filtersLower.cidade && !postLocationLower.includes(filtersLower.cidade)) return false;
    return true;
  });
  
  return (
    <div className="pagina-inicial">
      <Header />
      <div className="main-content">
        <div className="coluna-esquerda">
          <Filter onFilterSubmit={setFilters} />
        </div>

        <div className="coluna-central">
          <CommentBox onOpenModal={openModal} />

          {loading && <p>Carregando feed...</p>}
          {error && <p className="form-error-message">{error}</p>}
          {!loading && !error && (
            <PostList posts={displayedPosts} />
          )}
          
        </div>

        <div className="coluna-direita">
          <ProfileCard />
        </div>
      </div>
      {isModalOpen && (
        <PostModal 
          onCloseModal={closeModal} 
          onAddPost={handleAddPost}
        />
      )}
    </div>
  );
}

export default PaginaInicial;