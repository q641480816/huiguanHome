import React, {Component} from 'react';
import {PropTypes, instanceOf} from "prop-types";
import {Route, withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import utils from '../../common/util';
import cookie from 'react-cookies';
import Article from '../../component/article/Article';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewArticle: null
        };

        this.styles = this.props.classes;
    }

    componentDidMount() {
        if(typeof(localStorage.getItem("preview")) !== 'undefined'){
            let art = JSON.parse(localStorage.getItem('preview'));
            let date = new Date();
            art.creationTime = date.getFullYear() + " - " + date.getMonth() + " - " + date.getDate();
            this.setState({
                previewArticle: art
            })
        }
    }

    render() {
        // console.log(this.state.previewArticle)
        return (
            <div>
                {this.state.previewArticle === null ? <div/> : <Article previewArticle={this.state.previewArticle} isPreview={true} section={utils.getSection(this.state.previewArticle.sectionId.id)}/>}
            </div>
        );
    }

}

const styles = theme => ({

});

Preview.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Preview));
