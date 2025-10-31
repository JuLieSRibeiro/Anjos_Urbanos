// src/Paginas/PaginaInicial.jsx

import React from 'react';

import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import ProfileCard from '../ProfileCard/ProfileCard';
import CommentBox from '../CommentBox/CommentBox';
import PostList from '../PostList/PostList';

import './PaginaInicial.css';

function PaginaInicial() {
  return (
    <div className="pagina-inicial">
      
      {/* O Header fica no topo, fora do layout principal */}
      <Header />

      {/* Um container para o conteúdo principal (layout de 3 colunas) */}
      <div className="main-content">
        
        {/* Coluna da Esquerda */}
        <div className="coluna-esquerda">
          <Filter />
        </div>

        {/* Coluna Central (Feed) */}
        <div className="coluna-central">
          <CommentBox />
          <PostList />
        </div>

        {/* Coluna da Direita */}
        <div className="coluna-direita">
          <ProfileCard />
        </div>
        
      </div>
    </div>
  );
}

export default PaginaInicial;