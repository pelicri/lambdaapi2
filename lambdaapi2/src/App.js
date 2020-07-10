import React from 'react';
import logo from './logo.svg';
import './App.css';
import Instancias from './Instancias';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          App React Native - Lista de Instancias EC2 por região.
        </p>
        <a
          className="App-link"
          href="http://www.linkedin.com/in/cristianopelizzari"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin - Cristiano Pelizzari de Andrade
        </a>
        <span>
            
            <Instancias/>
        </span>
      </header>
    </div>
  );
}

export default App;
