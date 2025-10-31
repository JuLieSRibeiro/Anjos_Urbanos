import React from 'react';
import PostItem from '../PostItem/PostItem';
import './PostList.css';

function PostList() {
  const posts = [
    {
      nome: "Roberto Santos",
      cidade: "Jundiaí - SP",
      mensagem: "Recentemente perdi meu emprego e estou lutando para sustentar minha família. Precisamos de alimentos básicos, como arroz, feijão e leite. Se alguém puder ajudar de alguma forma, seja com doação ou indicando algum trabalho temporário, serei imensamente grato. Que Deus abençoe todos vocês.",
      botao: "Comentar",
      tags: ["#Doação", "#Alimentos", "#Emprego"]
    },
    {
      nome: "Angela Rodrigues",
      cidade: "Jundiaí - SP",      
      mensagem: "Oi, pessoal. Estou passando por uma fase difícil e no momento não consigo comprar todo o material escolar do meu filho. Sei que muitas pessoas também têm seus desafios, mas qualquer doação de caderno, lápis ou mochila já faria uma enorme diferença para nós. Obrigado por lerem",
      botao: "Comentar",
      tags: ["#Doação", "#Financeiro", "#Educação"]
    },
    {
      nome: "João Pedro",
      cidade: "São Pedro - SP",
      mensagem: "Meu nome é João e estou pedindo ajuda para conseguir roupas e calçados para mim e minha irmã mais nova. Estamos enfrentando dificuldades financeiras e qualquer contribuição seria muito bem-vinda. Agradeço de coração a todos que puderem ajudar.",
      botao: "Comentar",
      tags: ["#Doação", "#Roupas", "#Calçados"]
    }
  ];

  return (
    <div className="post-list">
     {posts.map((post, index) => (
        <PostItem 
          key={index}
          nome={post.nome}
          data={post.data}
          mensagem={post.mensagem}
          cidade={post.cidade}
          botao={post.botao}
          tags={post.tags}
        />
      ))}
    </div>
  );
}

export default PostList;
