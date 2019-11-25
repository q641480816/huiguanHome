import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route, Link} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import Add from '../add/Add';
import Edit from "../Edit/Edit";
import utils from "../../../common/util";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            sections: []
        };

        this.styles = this.props.classes;

        this.prepareSection = this.prepareSection.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderOptions = this.renderOptions.bind(this);

    }

    componentDidMount() {
        this.setState({
            sections: this.prepareSection()
        })
    }

    prepareSection = () => {
        let sections = [];
        utils.naviItems.forEach(p => {
            p.sub.forEach(s => {
                if(s.isRenderList){
                    sections.push(s)
                }
            })
        });

        return sections;
    };

    renderLogin = () => {
        return <div>login</div>
    };

    renderOptions = () => {
        return (
            <div>
                <p>
                    <Link to={'/admin/add'}>
                        添加新页面
                    </Link>
                </p>
                <p>
                    <Link to={'/admin/edit'}>
                        修改已知页面
                    </Link>
                </p>
            </div>
        )
    };

    render() {
        return (
            <div>
                <Route exact path="/admin">
                    {this.state.isLoggedIn ? this.renderOptions() : this.renderLogin()}
                </Route>
                <Add sections={this.state.sections}/>
                <Edit/>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {}
});

AdminPage.propTypes = {};

export default withStyles(styles)(AdminPage);
