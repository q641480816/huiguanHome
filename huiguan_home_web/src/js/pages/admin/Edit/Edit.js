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
            loadingMessage: ''
        };

        this.styles = this.props.classes;

        this.prepareSection = this.prepareSection.bind(this);
        this.update = this.update.bind(this);
        this.getArticle = this.getArticle.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
        this.renderSectionSelect = this.renderSectionSelect.bind(this);

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

            //save changes
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

    getArticle = () => {
        let id = this.state.isSearch ? this.state.searchText : this.state.section.id;
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
                                               this.setState({searchText: event.target.value})
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
                        <Button onClick={(event) => this.getArticle()} variant="outlined"
                                color="inherit" style={{height: '40px', width: '200px', marginTop: '50px'}}>
                            <div>确认并开始编辑</div>
                        </Button>
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
                                width: '100%', display: 'flex', flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: '30px'
                            }}>
                                <Button onClick={(event) => this.update()} variant="outlined" color="inherit">
                                    <div style={{paddingLeft: '7.5px'}}>更新文章</div>
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
    }
});

Edit.propTypes = {
    sections: PropTypes.array.isRequired
};

export default withStyles(styles)(Edit);
