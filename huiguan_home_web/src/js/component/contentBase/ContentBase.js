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
import Article from "../article/Article";
import ContactUs from "../../pages/contactUs/ContactUs";
import {brown} from "@material-ui/core/colors";

class ContentBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub: []
        };

        this.styles = this.props.classes;

        this.getSubPages = this.getSubPages.bind(this);
        this.renderSectionPages = this.renderSectionPages.bind(this);
        this.renderArticlePages = this.renderArticlePages.bind(this);
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

    renderSectionPages = () => {
        return this.state.sub.map(p => {
            if (p.isRenderList) {
                return (
                    <Route key={p.id} path={'/b/topics' + p.navigation}>
                        <Section section={p}/>
                    </Route>
                )
            } else if(p.isSpecial) {
                let dom = null;
                switch (p.id) {
                    case 16:
                        dom = (<ContactUs/>);
                        break;
                    case 17:
                        dom = (<div>Join us placeholder</div>);
                        break;
                    default:
                        dom = (<div/>);
                }
                return (
                    <Route key={p.id} path={'/b/topics' + p.navigation}>
                        {dom}
                    </Route>
                )
            } else {
                return (
                    <Route key={p.id} path={'/b/topics' + p.navigation + "/:id"}>
                        <Article section={p}/>
                    </Route>)
            }
        })
    };

    renderArticlePages = () => {
        let index = 0;
        return this.state.sub.map(s => {
            index++;
            return (
                <Route key={index} path={'/b/article' + s.navigation}>
                    <Switch>
                        <Route path={'/b/article' + s.navigation + "/:id"}>
                            <Article section={s}/>
                        </Route>
                    </Switch>
                </Route>
            )
        })
    };

    render() {
        return (
            <div>
                <Route path="/b/topics">
                    <Switch>
                        {this.renderSectionPages()}
                    </Switch>
                </Route>
                <Route path="/b/article">
                    {this.renderArticlePages()}
                </Route>
            </div>
        );
    }

}

const styles = theme => ({});

ContentBase.propTypes = {};

export default withStyles(styles)(ContentBase);
