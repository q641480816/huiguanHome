import React, {Component} from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';

import logo from './recources/img/tits.jpg';
import './App.css';
import Home from "./js/pages/home/Home";
import AdminPage from "./js/pages/admin/adminPage/AdminPage";

class App extends Component {
    componentDidMount() {
        document.title = "晋江会馆欢迎您";
    }

    render() {
        return (
            <HashRouter
                basename={'/'}
            >
                <Route exact path='/'>
                    <Redirect to="/b" />
                </Route>
                <Route path="/b">
                    <Home/>
                </Route>
                <Route path="/admin">
                    <AdminPage/>
                </Route>
            </HashRouter>
        );
    }
}

export default App;