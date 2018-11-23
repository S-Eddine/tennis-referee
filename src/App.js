import React, { Component } from 'react';
import './App.css';
import SetScore from './components/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Tennis Score Admin
          </p>
        </header>
          <SetScore />
      </div>
    );
  }
}

export default App;
