import React, { Component } from 'react';
import './App.css';
import { SpiltRouter } from './routes/Routing';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <SpiltRouter />
        </div>
      </Router>

    );
  }
}

export default App;
