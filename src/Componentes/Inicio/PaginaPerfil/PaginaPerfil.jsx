import React from 'react';
import Header from '../Header/Header';
import PostList from '../PostList/PostList'; 
import './PaginaPerfil.css';

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
  {
    type: "oferta", nome: "Marcela Silva", cidade: "Sorocaba - SP", avatar: "https://picsum.photos/seed/marcela/60/60", mensagem: "Pessoal, estou com umas cestas básicas sobrando da doação do meu bairro. Alguém sabe de uma instituição que precise?", botao: "Comentar", tags: ["#Oferta", "#Alimentos"],
    comments: [] 
  }
];

function PaginaPerfil() {

  const meusPosts = DADOS_INICIAIS_DOS_POSTS.filter(post => 
    post.nome === "Marcela Silva"
  );

  return (
    <div className="pagina-perfil">
      <Header />
      
      <div className="profile-page-container">
        <div className="profile-page-card">
          <div className="profile-page-cover"></div>

          <div className="profile-page-header">
            <div className="profile-page-avatar"></div>
            <h1>Marcela Silva</h1>
            <p>📍 Sorocaba - SP</p>
          </div>
          
          <div className="profile-page-content">
            <h3>Minhas Publicações</h3>
            <PostList posts={meusPosts} />
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