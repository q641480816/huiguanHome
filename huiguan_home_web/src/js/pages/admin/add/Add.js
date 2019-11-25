import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles, AppBar, Toolbar,Typography} from "@material-ui/core";

import './Add.css';
import utils from "../../../common/util";
import ArticleForm from "../../../component/articleForm/ArticleForm";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };

        this.styles = this.props.classes;

    }

    componentDidMount() {
        this.setState({
            sections: this.props.sections ? this.props.sections : this.state.sections
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.sections !== this.props.sections){
            this.setState({
                sections: this.props.sections
            })
        }
    }


    render() {
        return (
            <Route path="/admin/add">
                <div>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">
                                添加文章
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <ArticleForm sections={this.state.sections}/>
                </div>
            </Route>
        );
    }

}

const styles = theme => ({
    bodyContainer: {}
});

Add.propTypes = {
    sections: PropTypes.array.isRequired
};

export default withStyles(styles)(Add);
