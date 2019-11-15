import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './NewsEvents.css';
import Banner from "../../../component/banner/Banner";

class NewsEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '会馆动态'
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

NewsEvents.propTypes = {};

export default withStyles(styles)(NewsEvents);
