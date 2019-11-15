import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './NewsHome.css';
import Banner from "../../../component/banner/Banner";

class NewsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '会馆新闻'
        };

        this.styles = this.props.classes;
    }

    render() {
        return (
            <div>
                <Banner title={this.state.title}/>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        position: 'relative'
    }
});

NewsHome.propTypes = {};

export default withStyles(styles)(NewsHome);
