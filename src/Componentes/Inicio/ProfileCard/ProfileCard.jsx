import React from 'react';
import './ProfileCard.css';

function ProfileCard() {
  return (

    <div className="profile-card">
  <div className="profile-header"></div>
  <div className="profile-image">
    <img src="https://i.pinimg.com/1200x/b7/5b/29/b75b29441bbd967deda4365441497221.jpg" alt="Foto de perfil" />
  </div>
  <div className="profile-info">
    <h3>Marcela Silva</h3>
    <p>📍 Sorocaba - SP</p>
  </div>
</div>

  );
}

export default ProfileCard;
