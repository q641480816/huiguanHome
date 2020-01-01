import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles, Button, Divider} from "@material-ui/core";
import {Room, ContactPhone, Email} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import './BottomNavigater.css';
import utils from "../../common/util";

import divider from '../../../recources/img/divider.png';

class BottomNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                name: 'Chin Kang Huay Kuan',
                tel: '6223 5913',
                fax: '6223 5913',
                email: 'testemail@gmail.com',
                address: 'Bukit Pasoh Rd, Singapore'
            },
            events: [],
            properties: []
        };

        this.styles = this.props.classes;

        this.getEvent = this.getEvent.bind(this);
        this.getProperties = this.getProperties.bind(this);
        this.renderEvent = this.renderEvent.bind(this);
        this.renderProperties = this.renderProperties.bind(this);
        this.openLinkInNewTab = this.openLinkInNewTab.bind(this);
    }

    componentDidMount() {
        let events = this.getEvent();
        let properties = this.getProperties();
        let contact = utils.contact;

        this.setState({
            contact: contact,
            events: events,
            properties: properties,
        })
    }

    getEvent = () => {
        return utils.events;
    };

    getProperties = () => {
        return utils.properties;
    };

    renderEvent = () => {
        let eventList = this.state.events.map(e => {
            return (
                <div key={e.id} style={{margin: '10px 0 10px 0'}}>
                    <div className={"text textBold"}>{e.name}</div>
                    <div className={"text"}>{e.location}</div>
                </div>
            );
        });
        return eventList;
    };

    renderProperties = () => {
        let propertyList = this.state.properties.map(p => {
            return (
                <div key={p.id} style={{margin: '10px 0 10px 0'}}>
                    <div className={"text textBold link"} style={{cursor: 'pointer'}}
                         onClick={() => this.openLinkInNewTab(p.direction)}>{p.name}</div>
                    <div className={"text"}>{p.address}</div>
                </div>
            );
        });
        return propertyList;
    };

    openLinkInNewTab = (link) => {
        let win = window.open(link, '_blank');
        win.focus();
    };

    render() {
        return (
            <div className="base">
                <div className="fullWidthColumn">
                    <img src={divider} alt="" className="responsive-image"/>
                </div>

                <div className={this.styles.bottomContainer}>
                    <div className={this.styles.columnContainer}>
                        <h2 className={"bottomTitle text textBold"}>地址</h2>
                        <div className={"text textBold"}>{this.state.contact.name}</div>
                        <div className={this.styles.contactItemContainer}>
                            <div className={"iconBox"}>
                                <Button className={"iconButton"}
                                        onClick={() => this.openLinkInNewTab(this.state.contact.address.url)}><Room
                                    style={{fontSize: 40}}/></Button>
                            </div>
                            <div className={"text"}
                                 style={{marginLeft: '10px'}}>{this.state.contact.address.title}</div>
                        </div>
                    </div>
                    <Divider className={this.styles.divider}/>

                    <div className={this.styles.columnContainer}>
                        <h2 className={"bottomTitle text textBold"}>联系方式</h2>
                        <div className={"text textBold"}>{this.state.contact.name}</div>
                        <div className={this.styles.contactItemContainer}>
                            <div className={"iconBox"}>
                                <Button className={"iconButton"}><ContactPhone style={{fontSize: 40}}/></Button>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div className={"text"}
                                     style={{marginLeft: '10px'}}>Tel: {this.state.contact.tel}</div>
                                <div className={"text"}
                                     style={{marginLeft: '10px'}}>Fax: {this.state.contact.fax}</div>
                            </div>
                        </div>
                    </div>
                    <Divider className={this.styles.divider}/>

                    <div className={[this.styles.columnContainer]}>
                        <h2 className={"bottomTitle text textBold"}>电子邮件</h2>
                        <div className={"text textBold"}>{this.state.contact.name}</div>
                        <div className={this.styles.contactItemContainer}>
                            <div className={"iconBox"}>
                                <Button className={"iconButton"}><Email style={{fontSize: 40}}/></Button>
                            </div>
                            <div className={"text"}
                                 style={{marginLeft: '10px'}}>{this.state.contact.email}</div>
                        </div>
                    </div>
                </div>

                <div className={this.styles.copyRightContainer}>
                    版权所有新加坡晋江会馆
                    <Link to={'/admin'} style={{textDecoration: 'none', color: utils.colorScheme.tertiary, marginLeft: '10px'}}>
                        管理入口
                    </Link>
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    bottomContainer: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: '20px',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            marginBottom: '50px',
        }
    },
    columnContainer: {
        position: 'relative',
        display: "flex",
        flexDirection: 'column',
        margin: '0 30px 0 30px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            textAlign: 'center',
            padding: '20px 0px 20px 0px',
        },
        [theme.breakpoints.up('md')]: {
            width: '22.5%',
            padding: '20px 5px 20px 5px'
        },
    },
    contactItemContainer: {
        position: 'relative',
        display: "flex",
        width: '100%',
        marginTop: '10px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        }
    },
    divider: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    },
    copyRightContainer: {
        width: '100%',
        height: '60px',
        backgroundColor: utils.colorScheme.text,
        color: utils.colorScheme.tertiary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

BottomNavigator.propTypes = {};

export default withStyles(styles)(BottomNavigator);
