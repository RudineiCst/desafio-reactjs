import React,{useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const[repository, setRepository] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepository(response.data)
      
    });
      
  },[])


  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:`application ${Date.now()}`,
      url:`https://github.com/RudineiCst/desafio-reactjs`,
      techs:[`techs 1`,`techs 2`]
    })
   console.log(response.data);
    setRepository([...repository, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repository.filter(
      repository => repository.id !== id
    ))
      // estou filtrando o repositorio e removendo o repositorio excluído
  }

  return (
    <div>
      <ul data-testid="repository-list">
       
          {repository.map(repository => (
              <li key={repository.id}>
                {repository.title}
                 <button onClick={() => handleRemoveRepository(repository.id)}>
                 Remover
                 </button>
              </li>
            )
          )}
          
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
