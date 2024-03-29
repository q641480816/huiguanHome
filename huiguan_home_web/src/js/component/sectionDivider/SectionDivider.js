import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './SectionDivider.css';
import utils from "../../common/util";

class SectionDivider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            short: '',
            showDivider: true,
            fullLength: false,
            color: 'grey',
            textColor: utils.colorScheme.text
        };

        this.styles = this.props.classes;

        this.renderDivider = this.renderDivider.bind(this);
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            short: this.props.short ? this.props.short : '',
            showDivider: this.props.showDivider,
            fullLength: this.props.fullLength ? this.props.fullLength : this.state.fullLength,
            color: this.props.color ? this.props.color : this.state.color,
            textColor: this.props.textColor ? this.props.textColor : this.state.textColor
        })
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
                <div style={{width: this.state.fullLength ? '100%' : '80%', height: '2px', backgroundColor: this.state.color}}/>
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
                <div style={{marginTop: '30px', color: this.state.textColor}} className={this.styles.title}>
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
    showDivider: PropTypes.bool.isRequired,
    fullLength: PropTypes.bool,
    color: PropTypes.string,
    textColor: PropTypes.string
};

export default withStyles(styles)(SectionDivider);
