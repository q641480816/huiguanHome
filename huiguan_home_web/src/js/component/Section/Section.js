import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route, useParams} from 'react-router-dom';
import {Button, withStyles} from "@material-ui/core";
import parse from 'html-react-parser';

import Banner from "../banner/Banner";
import utils from "../../common/util";

import './Section.css';
import SectionDivider from "../sectionDivider/SectionDivider";

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: {title: '', navigation: '', isRenderList: true},
            articles: []
        };

        this.styles = this.props.classes;

        this.getArticleList = this.getArticleList.bind(this);
        this.renderArticleList = this.renderArticleList.bind(this);
    }

    componentDidMount() {
        this.setState({
            section: this.props.section ? this.props.section : this.state.section,
            articles: this.getArticleList()
        });
    }

    getArticleList = () => {
        return utils.dummyArticlesShort;
    };

    renderArticleList = () => {
        if (this.state.articles.length > 0) {
            return (
                <div className={this.styles.listWrapper}>
                    {this.state.articles.map(a => {
                        return (
                            <div key={a.id} className={this.styles.articleWrapper}>
                                <div className={this.styles.itemContainer}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                        <div className={this.styles.titleWrapper}>{a.title}</div>
                                        <div className={this.styles.articleContentWrapper}>
                                            <div className={this.styles.imgWrapper}>
                                                <img src={a.resource} className={this.styles.articleImg}/>
                                            </div>
                                            <div className={this.styles.descriptionWrapper}>{parse(a.description)}</div>
                                        </div>
                                    </div>
                                    <Button className={this.styles.readMoreButton}
                                            onClick={(event) => console.log("read more")} variant="outlined"
                                            color="inherit">
                                        <div>阅读更多</div>
                                    </Button>
                                </div>
                                {a.id !== this.state.articles[this.state.articles.length - 1].id ?
                                    <SectionDivider showDivider={true} fullLength={true}
                                                    color={utils.colorScheme.secondary} title={""}/> : <div style={{marginBottom: '10px'}}/>}

                            </div>
                        )
                    })}
                </div>
            );

            //return parse(this.state.articles[0].description);
        } else {
            return <div/>;
        }
    };

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <Banner title={this.state.section.title}/>
                <div className={this.styles.contentContainer}>
                    {this.renderArticleList()}
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    itemContainer: {
        [theme.breakpoints.down('xs')]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
        },
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: '30px'
    },
    listWrapper: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.up('md')]: {
            width: '55%',
        }
    },
    articleWrapper: {
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    articleContentWrapper: {
        width: '100%',
        display: "flex",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
            alignItems: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
        }
    },
    titleWrapper: {
        fontSize: '27px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: utils.colorScheme.secondary,
        transition: '0.3s',
        "&:hover": {
            color: utils.colorScheme.primary
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        }
    },
    imgWrapper: {
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            paddingBottom: '15px',
        }
    },
    articleImg: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '175px',
        },
        [theme.breakpoints.up('md')]: {
            width: '250px',
        }
    },
    descriptionWrapper: {
        marginLeft: '20px',
        color: utils.colorScheme.text
    },
    readMoreButton: {
        fontFamily: 'microsoft yahei,helvetica,simhei,simsun,sans-serif !important',
        transition: '0.3s',
        "&:hover": {
            color: utils.colorScheme.secondary
        },
        [theme.breakpoints.down('xs')]: {
            width: '100px',
            marginTop: '5px'
        },
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            bottom: '-17.5px',
            right: 0,
        },
        [theme.breakpoints.up('md')]: {
            bottom: 0,
        }
    }
});

Section.propTypes = {
    section: PropTypes.object.isRequired
};

export default withStyles(styles)(Section);
