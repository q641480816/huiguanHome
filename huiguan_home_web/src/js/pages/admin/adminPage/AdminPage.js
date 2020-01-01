import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route, Link, Redirect, withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import Add from '../add/Add';
import Edit from "../Edit/Edit";
import utils from "../../../common/util";
import Login from "./login/Login";
import FileDownload from '../fileDownload/fileDownload';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            sections: [],
            c: {
                username: '',
                token: ''
            }
        };

        this.styles = this.props.classes;

        this.prepareSection = this.prepareSection.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.setPassword = this.setPassword.bind(this);
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
                if (s.isRenderList) {
                    sections.push({id: s.id, title: s.title})
                }
            })
        });

        return sections;
    };

    renderLogin = () => {
        return <div>login</div>
    };

    setPassword = (u, p) => {
        this.setState({
            c: {
                username: u,
                token: p
            }
        }, () => this.props.history.push('/admin'));
    };

    validate = (u, p) => {
        if (u !== utils.username || p !== utils.token) {
            return false;
        }
        return true;
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
                <p>
                    <Link to={'/admin/file'}>
                        更改文件
                    </Link>
                </p>
            </div>
        )
    };

    render() {
        // if (!this.validate(this.state.c.username, this.state.c.token) && this.props.location.pathname.indexOf('/admin/login') !== 0){
        //     this.props.history.push('/admin/login');
        // }

        return (
            <div>
                <Route exact path="/admin">
                    {this.state.isLoggedIn ? this.renderOptions() : this.renderLogin()}
                </Route>
                <Route path={"/admin/login"}>
                    <Login setPassword={this.setPassword} validate={this.validate}/>
                </Route>
                <Add sections={this.state.sections}/>
                <Edit sections={this.state.sections}/>
                <FileDownload/>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {}
});

AdminPage.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AdminPage));
