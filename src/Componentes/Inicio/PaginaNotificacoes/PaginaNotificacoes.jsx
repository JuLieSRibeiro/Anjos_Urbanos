import React from 'react';
import Header from '../Header/Header';
import './PaginaNotificacoes.css';

// Dados de exemplo para as notificações
const mockNotifications = [
  { 
    id: 1, 
    type: 'message', 
    text: 'Roberto Santos enviou uma nova mensagem.', 
    time: 'há 5 min', 
    isRead: false, 
    link: '/mensagens' 
  },
  { 
    id: 2, 
    type: 'comment', 
    text: 'Carla Dias comentou no seu post: "Recentemente perdi meu emprego..."', 
    time: 'há 20 min', 
    isRead: false, 
    link: '/feed' 
  },
  { 
    id: 3, 
    type: 'reply', 
    text: 'Lucas Costa respondeu ao seu comentário em: "Que iniciativa maravilhosa..."', 
    time: 'há 1 hora', 
    isRead: true, 
    link: '/feed' 
  },
  { 
    id: 4, 
    type: 'message', 
    text: 'Angela Rodrigues enviou uma nova mensagem.', 
    time: 'há 3 horas', 
    isRead: true, 
    link: '/mensagens' 
  }
];

function PaginaNotificacoes() {
  return (
    <div className="pagina-notificacoes">
      <Header />
      
      <div className="notificacoes-container">
        {/* O card "flutuante" */}
        <div className="notificacoes-card">
          
          <h2 className="notificacoes-header">Notificações</h2>
          
          <div className="notificacoes-list">
            {mockNotifications.map(notif => (
              // Usamos <a> para simular a navegação
              <a href={notif.link} className={`notification-item ${!notif.isRead ? 'unread' : ''}`} key={notif.id}>
                
                {/* Ícone (placeholder) */}
                <div className={`notification-icon icon-${notif.type}`}></div>
                
                {/* Conteúdo (texto e tempo) */}
                <div className="notification-content">
                  <p className="notification-text">{notif.text}</p>
                  <span className="notification-time">{notif.time}</span>
                </div>
                
                {/* Bolinha de "não lido" */}
                {!notif.isRead && <div className="notification-dot"></div>}
              </a>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default PaginaNotificacoes;