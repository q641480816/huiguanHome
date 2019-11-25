import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.styles = this.props.classes;
    }

    render() {
        return (
            <Route path="/admin/edit">
                <div id='container' style={{display: "flex", flexDirection: "column", overflow: 'hidden'}}>
                    edit
                </div>
            </Route>
        );
    }

}

const styles = theme => ({
    bodyContainer: {}
});

Edit.propTypes = {};

export default withStyles(styles)(Edit);
