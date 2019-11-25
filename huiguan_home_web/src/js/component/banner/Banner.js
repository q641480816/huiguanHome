import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Banner.css';
import utils from "../../common/util";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'test',
            banner: 'https://lh3.googleusercontent.com/UkQ9b4eJRB_jltwWVCNoj8uR5SqXtjPL3bjBht9sCs49eV7723qs9NEtKqO9uheyPtYkSqbxaa13p2xpOodNf9pJa1oC5__Oyc8GY5lhBl-GAaKAoplyq2jRvIgt4ameufxTy054B1lgsMImEjpjuBvpADDFoTtX7aVWoscqdKdnGubmsFvTXof_Av6vcAjjWmUqxBvLdcgpsyEwU0bWXeFq-dfa7Xy7bq50d6ANO2cqeIq_ZYdhd56eWhCNUXzXGdMX6VHAz3wVI_v4TGXBuoTcS-WIZXJNDbhsXw21i2KK3aVFY-5dWcX00Z512m4k9A03waHjMNxKUCkXLRs9_KI3iujk43I920VJKoIKAbmv0hYnJZEKMysWsfjrSBxXD5orduL6pWdIx8ZQwQidP_aulV4RQsDnZ71gREDQCPmSlijreurMOFE-YBKktqQYRirsSRvFWlIw-pmGs2IKJHHuNrYQoj2OE_SjiAG-qf4vB9KA4KX-37HsjDYtN_oXr4pwO55kT7n7FcD_5ZSy7IKIcP2qrEEw3VawD7k_KigKntswhYbbAfPV4e1VxCUz9oh9YKLeWYyX9LnSxPVFqalucr09gGsvcxLPP0J3khckqB35OK2gCwyRzFKEs_EHisHZjFJDmWbYaMUPUDWRdXV4G01PlkBsZanyDJ-Kzw28V0bPD0GAEKTIqjHFTI_GiEAlG5Y_e4D-tKNzNbrXmqQxDdZ4gb63fb-QacrSeDHYoYE=w487-h51-no'
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
