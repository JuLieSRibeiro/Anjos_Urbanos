import React from 'react';
import './ProfileCard.css';

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src="https://picsum.photos/seed/marcela/90/90" alt="Foto de perfil" />
      </div>
      <div className="profile-info">
        <h3>Marcela Silva</h3>
        <p>📍 Sorocaba - SP</p>
      </div>
    </div>
  );
}

export default ProfileCard;