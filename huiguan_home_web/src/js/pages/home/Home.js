import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Home.css';

import BottomNavigator from "../../component/bottomNavigator/BottomNavigator";
import TopNavigator from "../../component/topNavigator/TopNavigator";
import HomeBody from "./homeBody/HomeBody";
import ContentBase from "../../component/contentBase/ContentBase";
import utils from "../../common/util";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.styles = this.props.classes;
    }

    render() {
        return (
            <div id='container' style={{display: "flex", flexDirection: "column", overflow: 'hidden'}}>
                <TopNavigator/>
                <div className={this.styles.bodyContainer}>
                    <Route exact path="/b">
                        <HomeBody/>
                    </Route>
                    <ContentBase/>
                </div>
                <BottomNavigator/>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        position: 'relative',
        marginBottom: '15px',
        [theme.breakpoints.down('xs')]: {
            marginTop: utils.uiConfig.topNavigator.heightSm,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: utils.uiConfig.topNavigator.heightMd,
        }
    }
});

Home.propTypes = {};

export default withStyles(styles)(Home);
