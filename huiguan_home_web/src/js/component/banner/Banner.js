import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Banner.css';
import banner from '../../../recources/img/banner.jpg';
import utils from "../../common/util";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'test',
            banner: banner
        };

        this.styles = this.props.classes;
    }


    componentDidMount() {
        this.setState({
            title: this.props.title,
            banner: this.props.banner ? this.props.banner : this.state.banner
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.title !== this.props.title){
            this.setState({
                title: this.props.title
            })
        }
    }

    render() {
        return (
            <div className={this.styles.bannerContainer}
                 style={{
                     backgroundImage: "url(" + this.state.banner + ")",
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center'
                 }}>
                <div className={this.styles.titleWrapper}>
                    {this.state.title}
                </div>
                {/*<div className={this.styles.bannerWrapper}>*/}
                {/*    <img src={this.state.banner} alt={"banner"} className={this.styles.banner}/>*/}
                {/*</div>*/}
            </div>
        );
    }

}

const styles = theme => ({
    bannerContainer: {
        width: '100%',
        height: '125px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
    },
    titleWrapper: {
        color: utils.colorScheme.back,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '40px',
            fontSize: '55px',
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '120px',
            fontSize: '70px',
        }
    }
});

Banner.propTypes = {
    title: PropTypes.string.isRequired,
    banner: PropTypes.string,
};

export default withStyles(styles)(Banner);
