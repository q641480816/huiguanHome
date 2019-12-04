import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {Button, withStyles} from "@material-ui/core";
import parse from 'html-react-parser';
import Pagination from "material-ui-flat-pagination";

import Banner from "../banner/Banner";
import utils from "../../common/util";

import './Section.css';
import SectionDivider from "../sectionDivider/SectionDivider";
import Loading from "../loading/Loading";

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: {id: 0, title: '', navigation: '', isRenderList: true},
            articles: [],
            offset: 0,
            count: 0,
            limit: 4,
            isLoading: false
        };

        this.styles = this.props.classes;

        this.getSectionContent = this.getSectionContent.bind(this);
        this.listenToScroll = this.listenToScroll.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.refreshArticle = this.refreshArticle.bind(this);
        this.renderArticleList = this.renderArticleList.bind(this);

        this.loading = React.createRef();
    }

    componentDidMount() {
        this.setState({
            section: this.props.section ? this.props.section : this.state.section,
        });
        this.getSectionContent(this.props.section.id, this.state.offset);
        //window.addEventListener('scroll', this.listenToScroll)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.section.id !== this.state.section.id) {
            this.setState({
                section: this.props.section ? this.props.section : this.state.section
            });
            this.getSectionContent(this.props.section.id, this.state.offset);
        }
    }

    listenToScroll = () => {
        console.log(window.pageYOffset);
    };

    getSectionContent = (id, offset) => {
        this.toggleLoading(true);

        let url = utils.protocol + utils.baseUrl + '/page/' + id + "/" + Math.floor(offset / this.state.limit) + "/" + this.state.limit;
        fetch(url, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    articles: data.articleList,
                    offset: offset,
                    count: data.articleSize
                });
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
                this.toggleLoading(false);
            })
            .catch(e => console.log(e));
    };

    refreshArticle = (offset) => {
        this.getSectionContent(this.state.section.id, offset);
    };

    toggleLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        });
        this.loading.current.toggleLoading(isLoading);
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
                                        alignItems: 'center',
                                        paddingBottom: a.resources.length !== 0 ? '0px' : '50px',
                                        width: '100%'
                                    }}>
                                        <div className={this.styles.titleWrapper}>
                                            <Link to={'/b/article' + this.state.section.navigation + "/" + a.id}
                                                  style={{textDecoration: 'none'}}
                                                  target="_blank"
                                                  className={'linkWrapper'}>
                                                <div className={this.styles.title}>{a.title}</div>
                                            </Link>
                                            {a.isTop ?
                                                <div className={this.styles.isTopWrapper}>置顶</div> : <div/>}
                                        </div>
                                        <div className={this.styles.timeWrapper}>{a.time}</div>
                                        <div className={this.styles.articleContentWrapper}>
                                            {a.resources.length !== 0 ?
                                                <div className={this.styles.imgWrapper}>
                                                    <img
                                                        src={a.resources[0].url ? a.resources[0].url : a.resources[0].content}
                                                        className={this.styles.articleImg}/>
                                                </div> : <div/>
                                            }
                                            <div
                                                className={this.styles.descriptionWrapper}>{a.description ? parse(a.description) : 'No Content'}</div>
                                        </div>
                                    </div>
                                    <Link to={'/b/article' + this.state.section.navigation + "/" + a.id} target="_blank"
                                          className={'linkWrapper'}>
                                        <Button className={this.styles.readMoreButton}
                                                onClick={(event) => console.log("")} variant="outlined"
                                                color="inherit">
                                            <div>阅读更多</div>
                                        </Button>
                                    </Link>
                                </div>
                                {a.id !== this.state.articles[this.state.articles.length - 1].id ?
                                    <SectionDivider showDivider={true} fullLength={true}
                                                    color={utils.colorScheme.secondary} title={""}/> :
                                    <div style={{marginBottom: '10px'}}/>}

                            </div>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {!this.state.isLoading ?
                        <div style={{fontSize: '27px', fontWeight: 'bold', color: utils.colorScheme.text}}>暂无文章</div> :
                        <div/>}
                </div>
            )
        }
    };

    render() {
        return (
            <div>
                <Banner title={this.state.section.title}/>
                <div className={this.styles.contentContainer}>
                    {this.renderArticleList()}
                    {this.state.count <= this.state.limit ? <div/> :
                        <div style={{marginTop: '50px'}}>
                            <Pagination
                                limit={this.state.limit}
                                offset={this.state.offset}
                                total={this.state.count}
                                onClick={(e, offset) => this.refreshArticle(offset)}
                            />
                        </div>
                    }
                </div>
                <Loading isMax={false} initialState={false} loadingMessage={'文章列表加载中'} ref={this.loading}/>
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
        flexDirection: "column",
        alignItems: 'center',
        marginTop: '30px',
        position: 'relative'
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
            width: '60%',
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
        fontWeight: 'bold',
        marginBottom: '20px',
        color: utils.colorScheme.secondary,
        transition: '0.3s',
        "&:hover": {
            color: utils.colorScheme.primary
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%', display: 'flex', flexDirection: 'column',
            fontSize: '22.5px',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center',
            fontSize: '27px',
        }
    },
    title: {
        color: utils.colorScheme.secondary,
        transition: '0.3s',
        "&:hover": {
            color: utils.colorScheme.primary
        }
    },
    timeWrapper: {
        fontSize: '15px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: utils.colorScheme.text,
        transition: '0.3s',
        cursor: 'default',
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
            width: '240px',
        },
        [theme.breakpoints.up('md')]: {
            width: '340px',
        }
    },
    descriptionWrapper: {
        color: utils.colorScheme.text,
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '20px',
            width: '100%',
        },
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
            bottom: '-20px',
            right: 0,
        },
        [theme.breakpoints.up('md')]: {
            bottom: 0,
        }
    },
    isTopWrapper: {
        fontSize: '12px',
        backgroundColor: utils.colorScheme.secondary,
        color: utils.colorScheme.tertiary,
        fontWeight: 'normal',
        padding: '3px 7px 3px 7px',
        borderRadius: '15px',
        width: '30px',
        textAlign: 'center',
        cursor: 'default',
        [theme.breakpoints.down('xs')]: {
            marginTop: '7.5px'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '10px',
        },
    }
});

Section.propTypes = {
    section: PropTypes.object.isRequired,
};

export default withStyles(styles)(Section);
