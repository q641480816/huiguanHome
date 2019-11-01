import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter, Route } from 'react-router-dom';

import BottomNavigator from "../../component/bottomNavigator/BottomNavigator";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount(){

    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <Route exact path="/">
                    fuck
                </Route>
                <BottomNavigator/>
            </div>
        );
    }

}

Home.propTypes = {

};

export default Home;
