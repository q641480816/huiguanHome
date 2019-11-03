import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Home.css';

import BottomNavigator from "../../component/bottomNavigator/BottomNavigator";
import TopNavigator from "../../component/topNavigator/TopNavigator";
import HomeBody from "./homeBody/HomeBody";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.styles = this.props.classes;
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <TopNavigator/>
                <div className={this.styles.bodyContainer}>
                    <Route exact path="/">
                        <HomeBody/>
                    </Route>
                </div>
                <BottomNavigator/>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            margin: '10vh 0 10px 0',
        },
        [theme.breakpoints.up('md')]: {
            margin: '20vh 0 10px 0',
        }
    }
});

Home.propTypes = {};

export default withStyles(styles)(Home);
