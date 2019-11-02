import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withRouter, Route} from 'react-router-dom';

import './Home.css';

import BottomNavigator from "../../component/bottomNavigator/BottomNavigator";
import TopNavigator from "../../component/topNavigator/TopNavigator";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <TopNavigator/>
                <div className={'bodyContainer'}>
                    <Route exact path="/">
                    </Route>
                </div>
                <BottomNavigator/>
            </div>
        );
    }

}

Home.propTypes = {};

export default Home;
