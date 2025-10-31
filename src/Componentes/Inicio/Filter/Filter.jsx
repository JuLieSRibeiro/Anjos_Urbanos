import React from 'react';
import './Filter.css';

function Filter() {
  return (
    <aside className="filter">
      <h3>FILTRO</h3>
      <input type="text" placeholder="Categoria" />
      <input type="text" placeholder="Estado" />
      <input type="text" placeholder="Cidade" />
      <button>Buscar</button>
    </aside>
  );
}

export default Filter;
