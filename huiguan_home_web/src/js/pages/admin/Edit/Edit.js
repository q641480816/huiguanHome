import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link, Route} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles,
    FormControlLabel,
    Checkbox,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Dialog,
    DialogActions
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './Edit.css';
import utils from "../../../common/util";
import Loading from "../../../component/loading/Loading";
import ArticleForm from "../../../component/articleForm/ArticleForm";
import SectionDivider from "../../../component/sectionDivider/SectionDivider";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            searchText: '',
            isLoading: false,
            sections: [],
            fullSections: [],
            section: {id: 1, title: '会馆简介', article: null},
            dialog: false,
            dialogMsg: '',
            selectedId: 0,
            article: null,
            isEditing: false,
            loadingMessage: '',
            searchResults: [],
            isSearched: false
        };

        this.styles = this.props.classes;

        this.prepareSection = this.prepareSection.bind(this);
        this.update = this.update.bind(this);
        this.getArticleFix = this.getArticleFix.bind(this);
        this.getArticleSearch = this.getArticleSearch.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
        this.renderSectionSelect = this.renderSectionSelect.bind(this);
        this.renderSearchContent = this.renderSearchContent.bind(this);
        this.preview = this.preview.bind(this);

        this.form = React.createRef();
        this.loading = React.createRef();
    }

    componentDidMount() {
        this.setState({
            sections: this.prepareSection(),
            fullSections: this.props.section ? this.props.section : this.state.section
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sections !== this.props.sections) {
            this.setState({
                fullSections: this.props.sections
            })
        }
    }

    preview = () => {
        let form = this.form.current.getForm();

        let index = 0;
        form.resources.map(r => {
            index ++;
            r.id = index;
            return r;
        })
        localStorage.setItem('preview', JSON.stringify(form));
        window.open(
            utils.previewUrl, '_blank'
        );
    }

    update = () => {
        let url = utils.protocol + utils.baseUrl + '/articles/' + this.state.article.id;
        let form = this.form.current.getForm();
        let pass = true;

        if (form.section === '' || form.title === '') {
            pass = false;
            this.setState({
                dialog: true,
                dialogMsg: '类别和标题不能为空'
            });
        }

        if((form.sectionId.id === 4 || form.isDirectUrl) && form.url.trim().length === 0){
            alert("会馆动态文章的URL不能为空");
            pass = false;
        }

        if (pass) {
            let body = {};
            let keys = Object.keys(form);
            for (let i = 0; i < keys.length; i++) {
                if (form[keys[i]] !== this.state.article[keys[i]]) {
                    if (keys[i] === 'sectionId') {
                        body['section'] = form[keys[i]]
                    } else {
                        body[keys[i]] = form[keys[i]];
                    }
                }
            }

            //add resources
            for (let i = 0; i < form.resources.length; i++) {
                delete form.resources[i].articleId;
            }
            body.resources = form.resources;

            // save changes
            this.toggleLoading('文章更新中', true);
            fetch(url, {
                method: 'put',
                headers: {'Content-Type': 'application/json', 'token': utils.token},
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    this.toggleLoading('', false);
                    alert('更新成功');
                    this.setState({
                        isEditing: false,
                        article: null
                    });
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                })
                .catch(e => {
                    this.toggleLoading('', false);
                    this.setState({
                        dialog: true,
                        dialogMsg: '文章更新失败，请重新选择有效ID'
                    })
                });
        }
    };

    getArticleFix = () => {
        let id = this.state.isSearch ? this.state.selectedId : this.state.section.id;
        if (isNaN(id)) {
            this.setState({dialog: true, dialogMsg: '文章 ID 选择错误！'})
        } else {
            this.toggleLoading('文章获取中', true);
            let url = utils.protocol + utils.baseUrl + '/articles/' + id;
            fetch(url, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())
                .then(data => {
                    this.toggleLoading('', false);
                    this.setState({article: data, isEditing: true});
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                })
                .catch(e => {
                    this.toggleLoading('', false);
                    this.setState({
                        dialog: true,
                        dialogMsg: '文章获取失败，请重新选择有效ID'
                    })
                });
        }
    };

    getArticleSearch = () => {
        if (this.state.searchText.trim() === '') {
            alert('关键字/id不能为空');
        } else {
            this.toggleLoading('文章列表获取中', true);
            let isNumber = !isNaN(this.state.searchText.trim());

            let urlId = utils.protocol + utils.baseUrl + '/articles/' + this.state.searchText.trim();
            let urlSearch = utils.protocol + utils.baseUrl + '/search';
            let body = {
                keyword: this.state.searchText.trim(),
                pageNum: 0,
                pageSize: 100
            };

            fetch(urlSearch, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.httpStatus === 200) {
                        let articles = data.articleList;
                        if (isNumber) {
                            fetch(urlId, {
                                method: 'get',
                                headers: {'Content-Type': 'application/json'}
                            })
                                .then(response => {
                                    this.toggleLoading('', false);
                                    return response.json()
                                })
                                .then(data => {
                                    articles.push(data);
                                    this.setState({
                                        searchResults: articles,
                                        isSearched: true
                                    });
                                    alert('文章搜索完成，点击文章开始编辑');
                                })
                                .catch(e => {
                                    alert('文章搜索完成，点击文章开始编辑');
                                    this.setState({
                                        searchResults: articles,
                                        isSearched: true
                                    });
                                });
                        } else {
                            this.toggleLoading('', false);
                            alert('文章搜索完成，点击文章开始编辑');
                            this.setState({
                                searchResults: articles,
                                isSearched: true
                            })
                        }
                    } else {
                        this.toggleLoading('', false);
                        alert('搜索错误:' + data.errorMessage);
                    }
                    //window.scroll({top: 0, left: 0, behavior: 'smooth'});
                })
                .catch(e => console.log(e));
        }
    };

    prepareSection = () => {
        let sections = [];
        utils.naviItems.forEach(i => {
            i.sub.forEach(s => {
                if (!s.isRenderList && !s.isSpecial) {
                    sections.push({id: s.articleId, article: null, title: s.title});
                }
            })
        });
        return sections;
    };

    toggleLoading = (msg, isLoading) => {
        this.setState({
            loadingMsg: msg,
            isLoading: isLoading
        });
        this.loading.current.toggleLoading(isLoading);
    };

    renderSearchContent = () => {
        return this.state.searchResults.map(a => {
            return (
                <div key={a.id} style={{display: 'flex', flexDirection: 'column', cursor: 'pointer', marginTop: '10px'}} onClick={() => {
                    this.setState({selectedId: a.id}, () => this.getArticleFix());
                }}>
                    <div>文章ID： {a.id}</div>
                    <div>文章标题： {a.title}</div>
                    <SectionDivider fullLength={true} showDivider={true} title={''}/>
                </div>
            )
        })
    };

    renderSwitch = () => {
        if (!this.state.isEditing) {
            return (
                <div className={this.styles.selectContainer}>
                    <div>
                        <div>
                            <FormControlLabel control={<Checkbox
                                checked={this.state.isSearch} onChange={(event) => {
                                this.setState({isSearch: true, article: null})
                            }}
                                value="true"
                            />} label="搜索现有文章"/>
                            <div className={this.styles.flexRow}>
                                <TextField required id="search-id" disabled={!this.state.isSearch}
                                           label={"关键字/文章ID"} value={this.state.searchText}
                                           onChange={(event) => {
                                               this.setState({searchText: event.target.value, isSearched: false})
                                           }}/>
                            </div>
                        </div>
                        <div style={{marginTop: '15px'}}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={!this.state.isSearch} onChange={() => {
                                    this.setState({isSearch: false, article: null})
                                }} value="false"
                                />} label="更改限定文章"/>
                            <div className={this.styles.flexRow}>
                                {this.renderSectionSelect()}
                            </div>
                        </div>
                        {!this.state.isSearch ?
                            <Button onClick={(event) => this.getArticleFix()} variant="outlined"
                                    color="inherit" style={{height: '40px', width: '200px', marginTop: '50px'}}>
                                <div>确认并开始编辑</div>
                            </Button> :
                            <Button onClick={(event) => this.getArticleSearch()} variant="outlined"
                                    color="inherit" style={{height: '40px', width: '200px', marginTop: '50px'}}>
                                <div>搜索文章</div>
                            </Button>
                        }
                        {this.state.isSearch && this.state.isSearched ?
                            <div>
                                {this.state.searchResults.length !== 0 ?
                                    <div className={this.styles.searchContentBase}>
                                        {this.renderSearchContent()}
                                    </div>
                                    : <div style={{marginTop: '30px'}}>无相应文章</div>}
                            </div> : <div/>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <Button onClick={(event) => this.setState({isEditing: false, article: null})} variant="outlined"
                        color="inherit" style={{height: '40px', width: '200px', marginTop: '10px'}}>
                    <div>从新选择文章</div>
                </Button>
            )
        }
    };

    renderSectionSelect = () => {
        return (
            <FormControl required={!this.state.isSearch} disabled={this.state.isSearch}>
                <InputLabel id="section-select-label">限定文章</InputLabel>
                <Select
                    labelId="section-select-label"
                    id="section-select"
                    value={this.state.section}
                    onChange={(event) => {
                        this.setState({section: event.target.value})
                    }}
                >
                    {this.state.sections.map(s => {
                        return (<MenuItem key={s.id} value={s}
                                          selected={s.id === this.state.section.id}>{s.title}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        )
    };

    render() {
        return (
            <Route path="/admin/edit">
                <div style={this.state.isLoading ? {width: '100vw', height: '100vh', overflow: 'hidden'} : {}}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Link to={'/admin'} style={{textDecoration: 'none', color: 'white'}}>
                                <ArrowBackIosIcon color="inherit" fontSize="large"/>
                            </Link>
                            <Typography variant="h6" color="inherit">
                                更改文章
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={this.styles.bodyContainer}>
                    <div style={{marginTop: '15px', marginLeft: '15px'}}>
                        {this.renderSwitch()}
                    </div>
                    {this.state.isEditing ?
                        <div>
                            <ArticleForm sections={this.state.fullSections} ref={this.form}
                                         isSection={!this.state.isSearch}
                                         article={this.state.article}/>
                            <div style={{
                                width: '100%', display: 'flex', flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: '30px'
                            }}>
                                <Button onClick={(event) => this.preview()} variant="outlined" color="inherit">
                                    <div>预览</div>
                                </Button>
                                <Button onClick={(event) => this.update()} variant="outlined" color="inherit" style={{marginLeft: '40px'}}>
                                    <div>更新文章</div>
                                </Button>
                            </div>
                        </div> :
                        <div/>}
                    <Loading loadingMessage={this.state.loadingMessage} isMax={true} initialState={false}
                             ref={this.loading}/>
                    <Dialog onClose={() => console.log("close")} aria-labelledby="simple-dialog-title"
                            open={this.state.dialog}>
                        <DialogTitle id="simple-dialog-title">错误</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.dialogMsg}
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={(event) => this.setState({dialog: false})} color="primary">
                                    确认
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className={this.styles.warning}>
                    此页面不支持手机浏览
                </div>
            </Route>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    selectContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    warning: {
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    searchContentBase: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '30px',
        marginTop: '40px'
    }
});

Edit.propTypes = {
    sections: PropTypes.array.isRequired
};

export default withStyles(styles)(Edit);
