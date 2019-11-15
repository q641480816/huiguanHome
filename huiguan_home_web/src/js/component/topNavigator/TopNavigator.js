import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Paper, withStyles, Button, Menu, MenuItem, Divider} from '@material-ui/core';
import {Apps} from '@material-ui/icons'
import {Link} from "react-router-dom";

import './TopNavigator.css';
import logo from '../../../recources/img/sgckhk_logo.jpg';
import logo_title from '../../../recources/img/ckhk_title.jpg'
import utils from "../../common/util";

class TopNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            naviItems: [],
            menuOpen: null,
            subMenu: null,
            subMenuAnchorEl: null
        };

        this.styles = this.props.classes;

        this.getNaviItems = this.getNaviItems.bind(this);
        this.renderNaviItems = this.renderNaviItems.bind(this);
        this.renderSubMenu = this.renderSubMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.openSubMenu = this.openSubMenu.bind(this);
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
        });

        console.log(event);
    };

    openSubMenu = (event, item) => {
        this.setState({
            subMenuAnchorEl: event.currentTarget,
            subMenu: item.title + "menu"
        });
    };

    renderSubMenu = (i) => {
        if (i.sub.length > 0) {
            return (
                <div className={this.styles.subMenu} style={{
                    display: this.state.subMenu === i.title + "menu" ? 'block' : 'none'
                }} onMouseLeave={() => this.setState({
                    subMenu: null
                })}>
                    <div onMouseEnter={() => this.setState({
                        subMenu: i.title + "menu"
                    })}>
                        <Paper className={this.styles.subMenuWrapper}>
                            {i.sub.map(s => {
                                return (
                                    <div>
                                        <Link to={s.navigation} className={"text textBold naviTimeWrapper"}>
                                            <div style={{
                                                margin: '10px 10px 10px 10px',
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                            }}>
                                                <div>{s.title}</div>
                                            </div>
                                        </Link>
                                        <Divider/>
                                    </div>
                                )
                            })}
                        </Paper>

                    </div>
                </div>
            )
        } else {
            return (<div/>);
        }
    };

    renderNaviItems = (isLarge) => {
        if (isLarge) {
            return this.state.naviItems.map(i => {
                return (
                    <div key={i.id}>
                        <Link to={i.navigation} className={"text textBold naviTimeWrapper"}
                              onMouseEnter={(event) => this.openSubMenu(event, i)} onMouseLeave={() => this.setState({
                            subMenu: null
                        })}>
                            <div className={this.styles.naviItem}>
                                <div>{i.title}</div>
                            </div>
                        </Link>
                        {this.renderSubMenu(i)}
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
        width: '100vw',
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
        width: '20vw',
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
        fontSize: '15px',
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
    },
    subMenu: {
        position: 'absolute',
        width: '175px',
    },
    subMenuWrapper: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        paddingTop: '1px',
        paddingBottom: '1px'
    }
});

TopNavigator.propTypes = {};

export default withStyles(styles)(TopNavigator);
