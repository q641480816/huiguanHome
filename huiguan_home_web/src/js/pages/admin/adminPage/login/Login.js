import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {Button, TextField, withStyles} from "@material-ui/core";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            c: {
                username: '',
                token: ''
            }
        };

        this.styles = this.props.classes;

        this.login = this.login.bind(this);
    }

    componentDidMount() {

    }

    login = () => {
        if(this.props.validate(this.state.c.username, this.state.c.token)){
            this.props.setPassword(this.state.c.username, this.state.c.token);
        }else{
            alert('密匙错误');
        }
    };

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <div>
                        <TextField required
                                   label={"用户名"} value={this.state.c.username}
                                   onChange={(event) => {
                                       let c = this.state.c;
                                       c.username = event.target.value;
                                       this.setState({c: c})
                                   }}/>
                    </div>
                </div>
                <div>
                    <TextField required
                               label={"密码"} value={this.state.c.token} type="password"
                               onChange={(event) => {
                                   let c = this.state.c;
                                   c.token = event.target.value;
                                   this.setState({c: c})
                               }}/>
                </div>
                <Button onClick={(event) => this.login()} color="primary">
                    确认
                </Button>
            </div>
        );
    }

}

const styles = theme => ({

});

Login.propTypes = {
    setPassword: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
