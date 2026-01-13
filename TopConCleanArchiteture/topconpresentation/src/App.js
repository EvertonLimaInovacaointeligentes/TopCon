import React from 'react';
import AppPrincipal from './components/AppPrincipal';
import './components/styles.css';
import './App.css';

// Importar utilitários de teste apenas em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  import('./utils/testApi');
  import('./utils/testLogin');
  import('./utils/testLoginDirect');
  import('./utils/testLoginComplete');
  import('./utils/testConnection');
  import('./utils/testUsuario');
  import('./utils/testPostagem');
}

function App() {
  return (
    <div className="App">
      <AppPrincipal />
    </div>
  );
}

export default App;
