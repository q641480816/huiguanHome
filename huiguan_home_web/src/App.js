import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import logo from './recources/img/tits.jpg';
import './App.css';
import Home from "./js/pages/home/home";

class App extends Component {
  componentDidMount(){
    document.title = "晋江会馆欢迎您";
  }

  render() {
    return (
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    );
  }
}

export default App;
