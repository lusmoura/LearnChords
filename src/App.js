import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <div className="wrapper">
            <div className="title">Salve, escolhe um ai</div>
            <div className="app">
                    <button className="App-intro-button">
                        <Link to="/appimg">Partitura</Link>
                    </button>
                    <button className="App-intro-button">
                        <Link to="/appsymbols">Letras</Link>
                    </button>
                    <button className="App-intro-button">
                        <Link to="/appnames">Nomes</Link>
                    </button>
            </div>
        </div>
    );
  }
}
export default App;