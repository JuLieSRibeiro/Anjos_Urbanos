import React, { useState } from 'react';
import './ConversationList.css';

const conversationsData = [
  {
    id: 1,
    name: "Roberto Santos",
    preview: "Muito obrigado pela ajuda! Não sei nem...",
    avatar: "https://picsum.photos/seed/roberto/45/45" 
  },
  {
    id: 2,
    name: "Angela Rodrigues",
    preview: "Sim, por favor! O material escolar é para...",
    avatar: "https://picsum.photos/seed/angela/45/45" 
  },
  {
    id: 3,
    name: "João Pedro",
    preview: "Você pode buscar as roupas amanhã...",
    avatar: "https://picsum.photos/seed/joao/45/45" 
  }
];

function ConversationItem({ conversation, isActive, onSelect }) {
  return (
    <div 
      className={`conversation-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(conversation.id)}
    >
      <img src={conversation.avatar} alt="Avatar" className="conversation-avatar" />
      <div className="conversation-details">
        <p className="conversation-name">{conversation.name}</p>
        <p className="conversation-preview">{conversation.preview}</p>
      </div>
    </div>
  );
}

function ConversationList({ onSelectConversation }) {
  
  const [activeConversationId, setActiveConversationId] = useState(null);

  const handleSelect = (id) => {
    setActiveConversationId(id);
    onSelectConversation(id);
  };

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h3>Mensagens</h3>
      </div>
      
      {conversationsData.map((convo) => (
        <ConversationItem
          key={convo.id}
          conversation={convo}
          isActive={convo.id === activeConversationId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default ConversationList;