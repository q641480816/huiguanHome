import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter, Route } from 'react-router-dom';

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
            <Route exact path="/">
                <div>
                   fuck
                </div>
            </Route>
        );
    }

}

Home.propTypes = {

};

export default Home;
