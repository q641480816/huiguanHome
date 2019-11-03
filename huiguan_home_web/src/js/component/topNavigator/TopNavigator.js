import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Paper, withStyles, Button, Menu, MenuItem} from '@material-ui/core';
import {Apps} from '@material-ui/icons'

import './TopNavigator.css';
import logo from '../../../recources/img/sgckhk_logo.jpg';
import logo_title from '../../../recources/img/ckhk_title.jpg'
import utils from "../../common/util";

class TopNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            naviItems: [],
            menuOpen: null
        };

        this.styles = this.props.classes;

        this.getNaviItems = this.getNaviItems.bind(this);
        this.renderNaviItems = this.renderNaviItems.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    componentDidMount() {
        let naviItems = this.getNaviItems();

        this.setState({
            naviItems: naviItems,
        })
    }

    getNaviItems = () => {
        return utils.naviItems;
    };

    openMenu = (event) => {
        this.setState({
            menuOpen: event.currentTarget
        })
    };

    renderNaviItems = (isLarge) => {
        if (isLarge) {
            return this.state.naviItems.map(i => {
                return (
                    <div key={i.id} className={"text textBold naviTimeWrapper"}>
                        <div className={this.styles.naviItem}>{i.title}</div>
                    </div>)
            })
        } else {
            return this.state.naviItems.map(i => {
                return <MenuItem key={i.id} onClick={() => {
                    console.log(i.title);
                    this.setState({
                        menuOpen: null
                    })
                }}>{i.title}</MenuItem>
            })
        }
    };

    render() {
        return (
            <div className={this.styles.navigatorBase}>
                <Paper className={"navigatorContainer"} square={true} elevation={2}>
                    <div>
                        <img id={"logo_title"} src={logo_title} alt="" className={this.styles.logo_title}/>
                    </div>
                    <div>
                        <div className={this.styles.naviTextWrapper}>
                            <div id={'naviItemsWrapper'}>{this.renderNaviItems(true)}</div>
                        </div>
                        <div className={this.styles.naviMenuWrapper}>
                            <Button onClick={(event) => this.openMenu(event)} variant="outlined" color="inherit"
                                    style={{display: 'flex', flexDirection: 'row'}}>
                                <Apps/>
                                <div style={{paddingLeft: '7.5px'}}>Find out more</div>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.menuOpen}
                                keepMounted
                                open={Boolean(this.state.menuOpen)}
                                onClose={() => {
                                    this.setState({menuOpen: null})
                                }}
                            >
                                {this.renderNaviItems(false)}
                            </Menu>
                        </div>
                    </div>
                </Paper>
                <div className={this.styles.logoBase}>
                    <div className={'centerBox'} style={{height: '100%'}}>
                        <img src={logo} alt="" className="responsive-logo"/>
                    </div>
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    navigatorBase: {
        position: 'fixed',
        width: '100%',
        zIndex: '200',
        backgroundColor: 'white',
        [theme.breakpoints.down('xs')]: {
            height: '12vh',
        },
        [theme.breakpoints.up('sm')]: {
            height: '20vh'
        }
    },
    logoBase: {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '20vh',
        width: '20%',
        minWidth: '85px',
        [theme.breakpoints.down('xs')]: {
            height: '12vh',
        },
        [theme.breakpoints.up('sm')]: {
            height: '20vh'
        }
    },
    logo_title: {
        width: '420px',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    naviItem: {
        fontSize: '12px',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            margin: '15px 5px 0px 5px'
        },
        [theme.breakpoints.up('md')]: {
            margin: '15px 20px 0px 20px'
        }
    },
    naviTextWrapper: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    naviMenuWrapper: {
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    }
});

TopNavigator.propTypes = {};

export default withStyles(styles)(TopNavigator);
