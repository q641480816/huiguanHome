import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    Route,
    Switch,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import utils from "../../common/util";
import Section from "../Section/Section";

class ContentBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub: []
        };

        this.styles = this.props.classes;

        this.getSubPages = this.getSubPages.bind(this);
        this.renderPages = this.renderPages.bind(this);
    }

    componentDidMount() {
        let pages = this.getSubPages();

        this.setState({
            sub: pages
        })
    }

    getSubPages = () => {
        let pages = [];
        utils.naviItems.forEach(first => pages = pages.concat(first.sub));
        return pages;
    };

    renderPages = () => {
        return this.state.sub.map(p => {
            if (p.isRenderList) {
                return (
                    <Route key={p.id} path={'/topics' + p.navigation}>
                        <Section section={p}/>
                    </Route>
                )
            }
        })
    }
    ;

    render() {
        return (
            <Route path="/topics">
                <Switch>
                    {this.renderPages()}
                </Switch>
            </Route>
        );
    }

}

const styles = theme => ({});

ContentBase.propTypes = {};

export default withStyles(styles)(ContentBase);
