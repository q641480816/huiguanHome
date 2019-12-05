import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    Paper,
    withStyles,
    Button,
    Menu,
    MenuItem,
    Divider,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    IconButton
} from '@material-ui/core';
import {Apps} from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search';
import {Link, withRouter} from "react-router-dom";
// import {isBrowser, isMobile} from "react-device-detect";

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
            subMenuAnchorEl: null,
            subParentMap: {},
            pathname: '',
            selectParentId: -1,
            selectedSubMenuMobile: -1
        };

        this.styles = this.props.classes;

        this.getNaviItems = this.getNaviItems.bind(this);
        this.renderNaviItems = this.renderNaviItems.bind(this);
        this.renderSubDialogMobile = this.renderSubDialogMobile.bind(this);
        this.renderSubMenu = this.renderSubMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.openSubMenu = this.openSubMenu.bind(this);
    }

    componentDidMount() {
        let naviItems = this.getNaviItems();

        this.setState({
            naviItems: naviItems.naviItems,
            subParentMap: naviItems.subParentMap
        })
    }

    componentDidUpdate(prevProps) {
        // this.setState({
        //     pathname: this.props.location.pathname,
        // });
    }


    getNaviItems = () => {
        let subParentMap = {};

        utils.naviItems.forEach(p => {
            p.sub.forEach(s => {
                subParentMap[s.navigation] = p.id;
            })
        });
        return {
            subParentMap: subParentMap,
            naviItems: utils.naviItems
        };
    };

    openMenu = (event) => {
        this.setState({
            menuOpen: event.currentTarget
        });
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
                                let url = s.isRenderList || s.isSpecial ? '/b/topics' + s.navigation : '/b/topics' + s.navigation + "/" + s.articleId;
                                return (
                                    <div key={s.id}>
                                        <div className={"text textBold naviTimeWrapper"}
                                             onClick={() => {
                                                 this.setState({
                                                     subMenu: null,
                                                     subMenuAnchorEl: null
                                                 }, () => {
                                                     this.props.history.push(url);
                                                     if (s.id === 17 && utils.cancelJoinUs !== null) {
                                                         utils.cancelJoinUs();
                                                     }
                                                 });
                                                 window.scroll({top: 0, left: 0, behavior: 'smooth'});
                                             }}>
                                            <div style={{
                                                margin: '10px 10px 10px 10px',
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                            }}>
                                                <div>{s.title}</div>
                                            </div>
                                        </div>
                                        {s.id !== i.sub[i.sub.length - 1].id ? <Divider/> : <div/>}
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
            let selectedId = 1;
            Object.keys(this.state.subParentMap).forEach(key => {
                if (this.props.location.pathname.indexOf(key) >= 0) {
                    selectedId = this.state.subParentMap[key];
                }
            });
            return this.state.naviItems.map(i => {
                let isSelected = i.id === selectedId;
                if (i.sub.length === 0) {
                    return (
                        <div key={i.id}>
                            <Link to={i.navigation}
                                  className={isSelected ? 'text textBold naviTimeWrapperSelected' : "text textBold naviTimeWrapper"}
                                  onMouseEnter={(event) => this.openSubMenu(event, i)}
                                  onMouseLeave={() => this.setState({
                                      subMenu: null
                                  })}
                                  onClick={() => {
                                      window.scroll({top: 0, left: 0, behavior: 'smooth'})
                                  }}>
                                <div className={this.styles.naviItem}>
                                    <div>{i.title}</div>
                                </div>
                            </Link>
                            {this.renderSubMenu(i)}
                        </div>)
                } else {
                    return (
                        <div key={i.id}>
                            <div
                                className={isSelected ? 'text textBold naviTimeWrapperSelected' : "text textBold naviTimeWrapper"}
                                onClick={(event) => this.openSubMenu(event, i)}
                                onMouseEnter={(event) => this.openSubMenu(event, i)} onMouseLeave={() => this.setState({
                                subMenu: null
                            })}>
                                <div className={this.styles.naviItem}>
                                    <div>{i.title}</div>
                                </div>
                            </div>
                            {this.renderSubMenu(i)}
                        </div>)
                }
            })
        } else {
            return this.state.naviItems.map(i => {
                return <MenuItem key={i.id} onClick={() => {
                    if (i.sub.length === 0) {
                        this.props.history.push(i.navigation);
                        this.setState({
                            menuOpen: null
                        })
                    } else {
                        this.setState({
                            menuOpen: null,
                            selectedSubMenuMobile: i.id
                        })
                    }
                }}>{i.title}</MenuItem>
            })
        }
    };

    renderSubDialogMobile = () => {
        return this.state.naviItems.map(i => {
            return (
                <Dialog key={i.id} aria-labelledby="simple-dialog-title"
                        open={this.state.selectedSubMenuMobile === i.id}>
                    <DialogTitle id="simple-dialog-title">{i.title}</DialogTitle>
                    <List>
                        {i.sub.map(s => (
                            <ListItem button onClick={() => {
                                let url = s.isRenderList ? '/b/topics' + s.navigation : '/b/topics' + s.navigation + "/" + s.articleId;
                                this.setState({selectedSubMenuMobile: -1});
                                this.props.history.push(url);
                                window.scroll({top: 0, left: 0, behavior: 'smooth'});
                            }} key={s.id}>
                                <ListItemText primary={s.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
            )
        })
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
                                <div style={{paddingLeft: '7.5px'}}>分类表</div>
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
                <div className={this.styles.searchBase}>
                    <div className={this.styles.searchWrapper} onClick={() => {
                        this.props.history.push("/b/search")
                    }}>
                        {/*<Tooltip title="搜索文章">*/}
                        {/*    <IconButton aria-label="delete" onClick={() => {*/}
                        {/*        this.props.history.push("/b/search")*/}
                        {/*    }}>*/}
                        <SearchIcon style={{fontSize: 30, color: "white"}}/>
                        <div className={this.styles.searchText}>搜索文章</div>
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.renderSubDialogMobile()}
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
            height: utils.uiConfig.topNavigator.heightSm,
        },
        [theme.breakpoints.up('sm')]: {
            height: utils.uiConfig.topNavigator.heightMd,
        }
    },
    logoBase: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '20vw',
        minWidth: '85px',
        [theme.breakpoints.down('xs')]: {
            height: utils.uiConfig.topNavigator.heightSm,
        },
        [theme.breakpoints.up('sm')]: {
            height: utils.uiConfig.topNavigator.heightMd,
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
        marginTop: '-12px',
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
    },
    searchBase: {
        position: 'absolute',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: 0,
        right: '30px',
        color: utils.colorScheme.secondary,
        [theme.breakpoints.down('xs')]: {
            width: '80px',
            justifyContent: 'center',
        },
        [theme.breakpoints.up('sm')]: {
            width: '150px',
            justifyContent: 'flex-end',
        }
    },
    searchWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: utils.colorScheme.secondary,
        padding: '3px 8px 3px 8px',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '0px',
            borderRadius: '30%',
        },
        [theme.breakpoints.up('sm')]: {
            marginBottom: '14px',
            borderRadius: '0 5px 5px 30px'
        },
    },
    searchText: {
        color: utils.colorScheme.back,
        marginLeft: '4px',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {},
        cursor: 'pointer'
    }
});

TopNavigator.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TopNavigator));
