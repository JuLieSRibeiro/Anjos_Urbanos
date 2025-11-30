import React from 'react';
import Header from '../Header/Header';
import PostList from '../PostList/PostList'; // Reutilizamos o PostList
import './PaginaPerfil.css';

// 1. COPIAMOS OS DADOS DE EXEMPLO PARA ESTE COMPONENTE
// (Em um app real, isso viria de um "estado global" ou "API")
const DADOS_INICIAIS_DOS_POSTS = [
  {
    type: "pedido", nome: "Roberto Santos", cidade: "Jundiaí - SP", avatar: "https://picsum.photos/seed/roberto/60/60", mensagem: "Recentemente perdi meu emprego...", botao: "Comentar", tags: ["#Doação", "#Alimentos", "#Emprego"],
    comments: [ { author: "Carla Dias", text: "Roberto, me manda seu contato.", avatar: "https://picsum.photos/seed/carla/32/32", likeCount: 5, isLiked: false } ]
  },
  {
    type: "pedido", nome: "Angela Rodrigues", cidade: "Jundiaí - SP", avatar: "https://picsum.photos/seed/angela/60/60", mensagem: "Oi, pessoal. Estou passando por uma fase difícil...", botao: "Comentar", tags: ["#Doação", "#Financeiro", "#Educação"],
    comments: [] 
  },
  {
    type: "oferta", nome: "João Pedro", cidade: "São Pedro - SP", avatar: "https://picsum.photos/seed/joao/60/60", mensagem: "Meu nome é João e estou doando roupas e calçados...", botao: "Comentar", tags: ["#Doação", "#Roupas", "#Calçados"],
    comments: [ { author: "Maria Oliveira", text: "Que iniciativa maravilhosa!", avatar: "https://picsum.photos/seed/maria/32/32", likeCount: 12, isLiked: false } ]
  },
  // Adicionando um post seu (Marcela) para o filtro funcionar
  {
    type: "oferta", nome: "Marcela Silva", cidade: "Sorocaba - SP", avatar: "https://picsum.photos/seed/marcela/60/60", mensagem: "Pessoal, estou com umas cestas básicas sobrando da doação do meu bairro. Alguém sabe de uma instituição que precise?", botao: "Comentar", tags: ["#Oferta", "#Alimentos"],
    comments: [] 
  }
];

function PaginaPerfil() {

  // 2. LÓGICA DE FILTRO: Pega a lista e filtra APENAS os posts do usuário logado
  const meusPosts = DADOS_INICIAIS_DOS_POSTS.filter(post => 
    post.nome === "Marcela Silva"
  );

  return (
    <div className="pagina-perfil">
      <Header />
      
      <div className="profile-page-container">
        <div className="profile-page-card">
          
          {/* A FOTO DE CAPA */}
          <div className="profile-page-cover"></div>
          
          {/* O CABEÇALHO (Avatar, Nome, Local) */}
          <div className="profile-page-header">
            <div className="profile-page-avatar"></div>
            <h1>Marcela Silva</h1>
            <p>📍 Sorocaba - SP</p>
          </div>
          
          {/* O FEED DE POSTS FILTRADO */}
          <div className="profile-page-content">
            <h3>Minhas Publicações</h3>
            <PostList posts={meusPosts} />
            
            {/* Mensagem caso não tenha posts */}
            {meusPosts.length === 0 && (
              <p>Você ainda não fez nenhuma publicação.</p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default PaginaPerfil;