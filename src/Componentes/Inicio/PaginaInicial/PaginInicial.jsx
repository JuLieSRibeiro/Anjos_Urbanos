// 1. Importe 'useEffect' e 'useNavigate' (para proteção de rota)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Importe o nosso novo serviço de posts
//    (CORREÇÃO: O caminho agora tem '.._/' (3 níveis) para sair de PaginaInicial/Inicio/Componentes/)
import postService from '../../../services/postService';

// Importando os Componentes (como antes)
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import ProfileCard from '../ProfileCard/ProfileCard';
import CommentBox from '../CommentBox/CommentBox';
import PostList from '../PostList/PostList'; 
import PostModal from '../PostModal/PostModal'; 

import './PaginaInicial.css';

// 3. REMOVEMOS OS DADOS_INICIAIS_DOS_POSTS

const defaultFilters = {
  modo: 'todos', categoria: '', estado: '', cidade: ''
};

function PaginaInicial() {
  const navigate = useNavigate();

  // 4. ESTADO (STATE)
  const [allPosts, setAllPosts] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  // 5. PEGA O TOKEN DO NAVEGADOR
  const userToken = localStorage.getItem('userToken');

  // 6. Hook useEffect: Roda UMA VEZ quando a página carrega
  useEffect(() => {
    // 7. Se não houver token, chuta o usuário para a página de login
    if (!userToken) {
      navigate('/login');
      return;
    }

    // 8. Função para buscar os posts da API
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setAllPosts(response.data); // Salva os posts do backend no estado
        setLoading(false);
      } catch (err) {
        setError("Não foi possível carregar o feed.");
        setLoading(false);
      }
    };

    fetchPosts(); // Chama a função
  }, [userToken, navigate]); // Dependências

  
  // 9. FUNÇÃO DE ADICIONAR POST (Atualizada)
  const handleAddPost = async (newPostData) => {
    try {
      // Chama a API para CRIAR o post no banco
      const response = await postService.createPost(newPostData, userToken);
      
      // Adiciona o novo post (que veio do backend) no topo da lista
      setAllPosts([response.data, ...allPosts]);
      closeModal();
    } catch (err) {
      alert("Erro ao criar o post. Tente novamente.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 10. LÓGICA DE FILTRO (como estava antes)
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
  
  // 11. O JSX (com lógica de 'loading')
  return (
    <div className="pagina-inicial">
      <Header />
      <div className="main-content">
        <div className="coluna-esquerda">
          <Filter onFilterSubmit={setFilters} />
        </div>

        <div className="coluna-central">
          <CommentBox onOpenModal={openModal} />
          
          {/* Lógica de Carregamento */}
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