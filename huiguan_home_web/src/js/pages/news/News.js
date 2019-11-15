import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './News.css';
import Banner from "../../component/banner/Banner";
import NewsHome from "./newsHome/NewsHome";
import NewsEvents from "./newsEvents/NewsEvents";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.styles = this.props.classes;
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <Route exact path="/news">
                    <NewsHome/>
                </Route>
                <Route exact path={'/news/events'}>
                    <NewsEvents/>
                </Route>
                <Route exact path={'/news/people'}>
                    people placeholder
                </Route>
                <Route exact path={'/news/videos'}>
                    videos placeholder
                </Route>
                <Route exact path={'/news/corporate'}>
                    corporate placeholder
                </Route>
            </div>
        );
    }

}

const styles = theme => ({

});

News.propTypes = {};

export default withStyles(styles)(News);
