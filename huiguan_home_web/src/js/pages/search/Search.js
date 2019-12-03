import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {withStyles, InputBase, Paper, IconButton, Button} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import utils from "../../common/util";
import parse from "html-react-parser";
import {Link} from "react-router-dom";
import SectionDivider from "../../component/sectionDivider/SectionDivider";
import {Apps} from "@material-ui/icons";
import Loading from "../../component/loading/Loading";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            articles: [],
            pageNum: 0,
            pageSize: 5,
            isFirst: true,
            isLast: false,
            isLoading: false
        };

        this.styles = this.props.classes;

        this.searchArticle = this.searchArticle.bind(this);
        this.renderArticleList = this.renderArticleList.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);

        this.loading = React.createRef();
    }

    componentDidMount() {

    }

    searchArticle = (isMore) => {
        this.setState({
            isFirst: false
        });
        this.toggleLoading(true);
        let url = utils.protocol + utils.baseUrl + '/search';
        let body = {
            keyword: this.state.keyword,
            pageNum: isMore ? this.state.pageNum + 1 : 0,
            pageSize: this.state.pageSize
        };
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                this.toggleLoading(false);
                let articles = this.state.articles;
                if (!isMore) {
                    articles = [];
                }
                articles = articles.concat(data.articleList);
                this.setState({
                    articles: articles,
                    pageNum: isMore ? this.state.pageNum + 1 : 0,
                    isLast: !isMore ? false : data.articleList.length === 0
                })
                //window.scroll({top: 0, left: 0, behavior: 'smooth'});
            })
            .catch(e => console.log(e));
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
                <div className={this.styles.listWrapper} style={{marginTop: '40px'}}>
                    {this.state.articles.map(a => {
                        console.log(a.sectionId)
                        return (
                            <div key={a.id} className={this.styles.articleWrapper}>
                                <div className={this.styles.itemContainer}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        paddingBottom: a.resource !== null ? '0px' : '50px'
                                    }}>
                                        <div className={this.styles.titleWrapper}
                                             style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            {a.title}
                                        </div>
                                        <div className={this.styles.titleWrapper}
                                             style={{fontSize: '15px', color: utils.colorScheme.text}}>{a.time}</div>
                                        <div className={this.styles.articleContentWrapper}>
                                            {a.resource ?
                                                <div className={this.styles.imgWrapper}>
                                                    <img
                                                        src={a.resource.url ? a.resource.url : a.resource.content}
                                                        className={this.styles.articleImg}/>
                                                </div> : <div/>
                                            }
                                            <div
                                                className={this.styles.descriptionWrapper}
                                                style={a.resource === null ? {marginLeft: 0} : {marginLeft: '20px'}}>
                                                {a.description ? parse(a.description) : 'No Content'}
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={'/b/article' + (utils.getSection(a.sectionId)).navigation + "/" + a.id} target="_blank"
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
                        <div style={{
                            fontSize: '27px',
                            fontWeight: 'bold',
                            marginTop: '30px',
                            color: utils.colorScheme.text
                        }}>{this.state.isFirst ? '请输入关键字搜索' : '无相关文章'}</div> :
                        <div/>}
                </div>
            )
        }
    };

    render() {
        return (
            <div className={this.styles.bodyContainer}>
                <Paper component="form" className={this.styles.searchBox}>
                    <InputBase
                        className={this.styles.input}
                        placeholder="关键字搜索"
                        inputProps={{'aria-label': "关键字搜索"}}
                        onChange={(event) => {
                            this.setState({keyword: event.target.value})
                        }}
                    />
                    <IconButton onClick={() => this.searchArticle(false)} className={this.styles.iconButton}
                                aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
                {this.renderArticleList()}
                {this.state.articles.length > 0 ?
                    !this.state.isLast ? <Button onClick={(event) => this.searchArticle(true)} variant="outlined" color="inherit"
                            style={{display: 'flex', flexDirection: 'row'}}>
                        <Apps/>
                        <div style={{paddingLeft: '7.5px'}}>加载更多</div>
                    </Button> : <div style={{
                        fontSize: '27px',
                        fontWeight: 'bold',
                        marginTop: '30px',
                        color: utils.colorScheme.text
                    }}>{'无更多文章'}</div> :
                    <div/>
                }
                <Loading isMax={false} initialState={false} loadingMessage={'文章搜索中'} ref={this.loading}/>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px'
    },
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
    searchBox: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        minWidth: '250px',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
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
});

Search.propTypes = {};

export default withStyles(styles)(Search);
