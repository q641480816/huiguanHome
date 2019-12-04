import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route, Link} from 'react-router-dom';
import {
    withStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './Add.css';
import utils from "../../../common/util";
import ArticleForm from "../../../component/articleForm/ArticleForm";
import Loading from "../../../component/loading/Loading";
import BraftEditor from "braft-editor";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            sections: [],
            dialog: false,
            dialogMsg: ''
        };

        this.styles = this.props.classes;

        this.publish = this.publish.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);

        this.form = React.createRef();
        this.loading = React.createRef();
    }

    componentDidMount() {
        this.setState({
            sections: this.props.sections ? this.props.sections : this.state.sections
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sections !== this.props.sections) {
            this.setState({
                sections: this.props.sections
            })
        }
    }

    toggleLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        });
        this.loading.current.toggleLoading(isLoading);
    };

    publish = () => {
        let url = utils.protocol + utils.baseUrl + '/articles/';
        let form = this.form.current.getForm();
        let pass = true;

        if (form.title === '') {
            pass = false;
            this.setState({
                dialog: true,
                dialogMsg: '类别和标题不能为空'
            });
        }

        if (pass) {
            this.toggleLoading(true);
            let d = (new Date(form.time));
            form.time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            form.section = form.sectionId;
            delete form.sectionId;

            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': utils.token
                },
                body: JSON.stringify(form)
            }).then(response => response.json())
                .then(data => {
                    this.toggleLoading(false);
                    alert('添加成功');
                    this.form.current.clearForm();
                })
                .catch(e => {
                    this.toggleLoading(false);
                    this.setState({
                        dialog: true,
                        dialogMsg: '上传失败，请确认内容格式正确'
                    });
                    console.log(e);
                });
        }
    };


    render() {
        return (
            <Route path="/admin/add">
                <div style={this.state.isLoading ? {width: '100vw', height: '100vh', overflow: 'hidden'} : {}}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Link to={'/admin'} style={{textDecoration: 'none', color: 'inherit'}}>
                                <ArrowBackIosIcon color="inherit" fontSize="large"/>
                            </Link>
                            <Typography variant="h6" color="inherit">
                                添加文章
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={this.styles.bodyContainer}>
                        <ArticleForm sections={this.state.sections} ref={this.form}/>
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '30px'
                        }}>
                            <Button onClick={(event) => this.publish()} variant="outlined" color="inherit">
                                <div style={{paddingLeft: '7.5px'}}>上传文章</div>
                            </Button>
                        </div>
                        <Loading loadingMessage={"文章上传中"} isMax={true} initialState={false} ref={this.loading}/>
                        <Dialog onClose={() => console.log("close")} aria-labelledby="simple-dialog-title"
                                open={this.state.dialog}>
                            <DialogTitle id="simple-dialog-title">上传失败</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    发表失败，请确认内容格式正确
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
    warning: {
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
});

Add.propTypes = {
    sections: PropTypes.array.isRequired
};

export default withStyles(styles)(Add);
