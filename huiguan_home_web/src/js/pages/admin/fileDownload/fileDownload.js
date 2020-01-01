import React, {Component} from 'react';
import {PropTypes, instanceOf} from "prop-types";
import {Route, withRouter, Link} from 'react-router-dom';
import {withStyles, AppBar, Typography, Toolbar, Input,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Loading from "../../../component/loading/Loading";
import utils from "../../../common/util";

class FileDownload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docList: [],
            deleteDialog: false,
            deleteSelect: {name: ''},
            isAdding: false,
            newDocName: '',
            newDoc: null,
            isLoading: false,
        };

        this.styles = this.props.classes;
        this.getDocList = this.getDocList.bind(this);
        this.processDocList = this.processDocList.bind(this);
        this.deleteDoc = this.deleteDoc.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.upload = this.upload.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);

        this.loading = React.createRef();
    }

    componentDidMount() {
        this.getDocList();
    }

    getDocList = () => {
        let url = utils.protocol + utils.fileUrl + '/path';

        fetch(url, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                let list = this.processDocList(data.paths);

                this.setState({
                    docList: list
                })
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
            })
            .catch(e => console.log(e));
    }

    deleteDoc = (d) => {
        let url = utils.protocol + utils.fileUrl + '/';

        let body = {
            name: d.name
        }

        fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'token': utils.token
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                if (data.httpStatus === 200){
                    alert(d.name + " 删除成功")
                    this.getDocList();
                }else{
                    alert(d.name + " 删除失败")
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    processDocList = (list) => {
        let docList = [];
        list.forEach(d => {
            let doc = {};
            doc.name = d.substring(d.lastIndexOf("/") + 1);
            doc.url = 'http://58.84.43.75/PPUploadFile/download/' + doc.name;
            docList.push(doc);
        });

        docList.sort((a1, a2) => {
            let t1 = parseInt(a1.name.substring(1, a1.name.indexOf(']')));
            let t2 = parseInt(a2.name.substring(1, a2.name.indexOf(']')));

            return t2 - t1;
        })

        return docList;
    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    toggleLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        });
        this.loading.current.toggleLoading(isLoading);
    };

    upload = () => {
        this.setState({isLoading: true});
        this.toggleLoading(true);

        if(this.state.newDoc === null || this.state.newDocName.trim().length === 0){
            this.setState({isLoading: false});
            this.toggleLoading(false);
            alert('请填写文件名 或 选择文件！');
        }else{
            this.getBase64(this.state.newDoc).then((res) => {
                // console.log(this.state.newDoc.name);
                let sufix = this.state.newDoc.name.substring(this.state.newDoc.name.lastIndexOf('.'))
                let url = utils.protocol + utils.fileUrl + '/upload';
                let body = {name: "[" + (new Date()).getTime() + "]" +this.state.newDocName + sufix, value: res}

                fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': 'admin_jinjiang'
                    },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(data => {
                        if (data.httpStatus === 200){
                            alert(this.state.newDocName + " 上传成功")
                            this.setState({
                                isLoading: false,
                                newDoc: null,
                                newDocName: '',
                                isAdding: false
                            }, this.getDocList());
                            this.toggleLoading(false);
                        }else{
                            alert(this.state.newDocName + " 上传失败失败： " + data.errorMessage);
                            this.setState({
                                isLoading: false,
                                newDoc: null,
                                newDocName: '',
                                isAdding: false
                            })
                            this.toggleLoading(false);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }).catch((err) => {
                console.log(err);
            }) 
        }
    }

    render() {
        return (
            <Route path="/admin/file">
                <div className={this.styles.baseContainer} style={this.state.isLoading ? {width: '100vw', height: '100vh', overflow: 'hidden'} : {}}>
                    <AppBar position="static">
                            <Toolbar variant="dense">
                                <Link to={'/admin'} style={{textDecoration: 'none', color: 'inherit'}}>
                                    <ArrowBackIosIcon color="inherit" fontSize="large"/>
                                </Link>
                                <Typography variant="h6" color="inherit">
                                    文件管理
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    <div>
                        <div className={this.styles.addFileContainer}>
                            <div style={{display: this.state.isAdding ? 'none' : 'block'}}>
                                <Button
                                    onClick={(event) => this.setState({isAdding: true})} variant="outlined"
                                    color="inherit">
                                    <div>添加文件</div>
                                </Button>
                            </div>
                            <div style={{display: !this.state.isAdding ? 'none' : 'block'}}>
                                <div className={'question'}>
                                        <div className={'question-description'}>文件名称</div>
                                        <TextField required style={{width: '90%'}}
                                                   label={"文件名称"}
                                                   value={this.state.newDocName}
                                                   onChange={(event) => {
                                                        this.setState({
                                                            newDocName: event.target.value
                                                        })
                                                   }}/>
                                </div>
                                <Input type={'file'} onChange={(event) => {
                                    this.setState({
                                        newDoc: event.target.files[0]
                                    })
                                }}/>

                                <div style={{marginTop: '20px'}}>
                                    <Button
                                        onClick={(event) => this.setState({isAdding: false, newDoc: null, newDocName: ''})} variant="outlined"
                                        color="inherit">
                                        <div>取消</div>
                                    </Button>
                                    <Button style={{marginLeft: '20px'}}
                                        onClick={(event) => this.upload()} variant="outlined"
                                        color="inherit">
                                        <div>确认添加</div>
                                    </Button>
                                </div>
                            </div>

                        </div>

                        <div className={this.styles.listContainer}>
                            <div style={{
                                marginBottom: '15px',
                                fontSize: '30px',
                                fontWeight: 'bold'
                            }}>现有文件</div>
                            {this.state.docList.map((d) => {
                                return (
                                    // <a href={d.url} target='_blank' style={{textDecoration: 'none', color: utils.colorScheme.text}}>
                                        <div key={d.name} style={{display: 'flex', flexDirection: 'row'}}>
                                            <div className={this.styles.docTitle}>
                                                {d.name.substring(d.name.indexOf(']') + 1)}
                                            </div>
                                            <div>
                                                <div onClick={() => {
                                                    this.setState({
                                                        deleteDialog: true,
                                                        deleteSelect: d
                                                    })
                                                }}
                                                 style={{marginLeft: '30px', border: '1px solid', padding: '2px 5px 2px 5px', borderRadius: '10px', cursor: 'pointer'}}>
                                                    删除
                                                </div>
                                            </div>
                                        </div>
                                    // </a>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                    <Loading loadingMessage={"文件上传中"} isMax={true} initialState={false} ref={this.loading}/>
                    <Dialog open={this.state.deleteDialog} onClose={() => {console.log('close')}} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">删除文件</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            确定删除文件： {this.state.deleteSelect.name.substring(this.state.deleteSelect.name.indexOf(']') + 1)}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {this.setState({deleteDialog: false, deleteSelect: {name: ''}})}} color="primary">
                                取消
                            </Button>
                            <Button onClick={() => {
                                this.deleteDoc(this.state.deleteSelect);
                                this.setState({deleteDialog: false, deleteSelect: {name: ''}});
                                }} color="primary">
                                确定
                            </Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                </div>
            </Route>
        );
    }

}

const styles = theme => ({
    baseContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    listContainer: {
        display: 'flex',
        marginTop: '50px',
        marginBottom: '30px',
        flexDirection: 'column',
        color: utils.colorScheme.text,
        marginLeft: '30px'
    },
    docTitle: {
        fontSiza: '25px',
        marginBottom: '15px',
    },
    addFileContainer: {
        marginLeft:'30px',
        marginTop: '30px'
    }
});

FileDownload.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(FileDownload));
