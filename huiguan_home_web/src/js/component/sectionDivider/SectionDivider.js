import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './SectionDivider.css';

class SectionDivider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            short: '',
            showDivider: true
        };

        this.styles = this.props.classes;

        this.renderDivider = this.renderDivider.bind(this);
    }

    componentWillMount() {
        this.setState({
            title: this.props.title,
            short: this.props.short ? this.props.short : '',
            showDivider: this.props.showDivider
        })
    }

    componentDidMount() {

    }

    renderDivider = () => {
        if (this.state.showDivider) {
            return <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{width: '80%', height: '2px', backgroundColor: 'grey'}}/>
            </div>
        }
        return <div/>;
    };

    render() {
        return (
            <div className={"container"} style={{
                display: "flex", flexDirection: "column", width: '100%', justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.renderDivider()}
                <div style={{marginTop: '30px'}} className={this.styles.title}>
                    {this.state.title}
                </div>
                <div style={{marginTop: '5px'}} className={this.styles.short}>
                    {this.state.short}
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    title: {
        textTransform: 'uppercase',
        color: '#585555',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: '27.5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '37.5px',
        }
    },
    short: {
        color: 'grey',
        fontWeight: 300,
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    }
});

SectionDivider.propTypes = {
    title: PropTypes.string.isRequired,
    short: PropTypes.string,
    showDivider: PropTypes.bool.isRequired
};

export default withStyles(styles)(SectionDivider);
