

import React, { useState } from 'react';
import './Filter.css';


const defaultFilters = {
  modo: 'todos', // O modo "todos" não está nos botões, mas é onde mostra todos
  categoria: '',
  estado: '',
  cidade: ''
};
// function do filho o pai tá na pagina inicial
function Filter({ onFilterSubmit }) {
  
  // inicia o useState pra controlar os dados de cada caixa, tudo começa com default padrão ou seja vazio
  const [modo, setModo] = useState(defaultFilters.modo);
  const [categoria, setCategoria] = useState(defaultFilters.categoria);
  const [estado, setEstado] = useState(defaultFilters.estado);
  const [cidade, setCidade] = useState(defaultFilters.cidade);

  // function de envio
  const handleSubmit = (event) => {
    event.preventDefault(); 
    onFilterSubmit({
      modo: modo,
      categoria: categoria,
      estado: estado,
      cidade: cidade
    });
  };

  // function de Limpar
  const handleClear = () => {
    
    setModo(defaultFilters.modo);
    setCategoria(defaultFilters.categoria);
    setEstado(defaultFilters.cidade);
    setCidade(defaultFilters.estado);
    
    // submit (envia )o estado padrão "limpo" para o PaginInicial
    onFilterSubmit(defaultFilters);
  };

  return (
    <form className="filter" onSubmit={handleSubmit}>
      <h3>FILTRO</h3>
      
      {/* aqui é os botoes do filtro pra filtrar dentro de ofertas ou dentro de pedidos por que se não ia aparecer tudo e essa parte toda aqui a baixo são os inputs do filtro igual fizemos no trabalho do petshop */}
      <div className="filter-mode-selector">
        <button 
          type="button" 
          className={`mode-button ${modo === 'pedidos' ? 'active' : ''}`}
          onClick={() => setModo('pedidos')}
        >
          Precisam de Ajuda
        </button>
        <button 
          type="button"
          className={`mode-button ${modo === 'ofertas' ? 'active' : ''}`}
          onClick={() => setModo('ofertas')}
        >
          Querem Ajudar
        </button>
      </div>
      
      <input 
        type="text" 
        placeholder="Categoria (Ex: Alimentos)" 
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Estado (Ex: SP)" 
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Cidade (Ex: Sorocaba)" 
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />
      
      <div className="filter-button-group">
        <button 
          type="button"
          className="filter-clear-button" 
          onClick={handleClear}
        >
          Limpar
        </button>
        <button 
          type="submit" 
          className="filter-submit-button"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

export default Filter;