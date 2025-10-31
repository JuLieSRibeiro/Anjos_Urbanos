import React from 'react';
import './ProfileCard.css';

function ProfileCard() {
  return (
    // <div className="profile-card">
    //   <img src="image.png" alt="Foto do perfil" className="perfile-imagem" />
    //   <h3 className="perfile-nome">Skilo</h3>
    //   <p className="perfile-bio">Piriri pororo.</p>
    // </div>

    <div className="profile-card">
  <div className="profile-header"></div>
  <div className="profile-image">
    <img src="sua-imagem.jpg" alt="Foto de perfil" />
  </div>
  <div className="profile-info">
    <h3>Marcela Silva</h3>
    <p>📍 Sorocaba - SP</p>
  </div>
</div>


  );
}

export default ProfileCard;
