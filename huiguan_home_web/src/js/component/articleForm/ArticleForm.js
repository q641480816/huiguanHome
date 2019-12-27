import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    withStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContent,
    TextField, Paper, Button, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogActions, DialogContentText
} from "@material-ui/core";
import BraftEditor from 'braft-editor';
import Table from 'braft-extensions/dist/table'
import ImageUploader from 'react-images-upload';
import { ContentUtils } from 'braft-utils';

import './ArticleForm.css';
// import './editor.css';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';

import utils from "../../common/util";

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                sectionId: 4,
                title: '',
                description: '',
                content: BraftEditor.createEditorState('<p/>'),
                time: (new Date()),
                url: '',
                resources: [],
                isTop: false,
                isDirectUrl: true
            },
            sections: [],
            titleLengthLimit: 60,
            imgTitleLengthLimit: 10,
            descriptionLengthLimit: 240,
            imgDescriptionLengthLimit: 30,
            isSection: false,
            editorControls: [
                'font-size', 'line-height', 'letter-spacing', 'separator',
                'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
                'headings', 'list-ul', 'list-ol', 'blockquote', 'separator',
                'link', 'separator', 'hr', 'separator', 'code', 'separator', 'clear', 'table'
                //, 'separator', 'media'
            ],
            mediaControl: {
                accepts: {
                    image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
                    video: false,
                    audio: false
                },
                externals: {
                    image: false,
                    video: false,
                    audio: false,
                    embed: false
                },
                pasteImage: false,
                onInsert: (event) => {
                    console.log(event);
                }
            },
            directUrlSection: [4],
            videoDialog: false,
            imgDialog: false,
            videoDialogText: '',
            imgDialogText: ''
        };

        this.styles = this.props.classes;

        this.getForm = this.getForm.bind(this);
        this.onImageSelect = this.onImageSelect.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.prepareForm = this.prepareForm.bind(this);
        this.renderSectionSelect = this.renderSectionSelect.bind(this);
        this.renderImagePreview = this.renderImagePreview.bind(this);
        this.insertVideo = this.insertVideo.bind(this);
        this.insertImg = this.insertImg.bind(this);
        this.renderImgDialog = this.renderImgDialog.bind(this);
    }

    componentDidMount() {
        this.setState({
            sections: this.props.sections ? this.props.sections : this.state.sections,
            isSection: this.props.isSection ? this.props.isSection : this.state.isSection,
            form: this.props.article ? this.prepareForm(this.props.sections, this.props.article) : this.state.form
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sections.length !== this.props.sections.length) {
            this.setState({
                sections: this.props.sections,
                isSection: this.props.isSection ? this.props.isSection : this.state.isSection,
                form: this.props.article ? this.prepareForm(this.props.sections, this.props.article) : this.state.form
            })
        }
    }

    prepareForm = (sections, article) => {
        let section = {};
        for (let i = 0; i < sections.length; i++) {
            if ((sections[i].id + "") === (article.sectionId + "")) {
                section = {
                    id: sections[i].id,
                    title: sections[i].title
                }
            }
        }

        return {
            sectionId: section.id,
            title: article.title,
            description: article.description,
            content: BraftEditor.createEditorState(article.content, { editorId: 'editor' }),
            time: (new Date(article.time)),
            url: article.url ? article.url : '',
            resources: utils.common.sortImgs(article.resources),
            isTop: article.isTop,
            isDirectUrl: article.isDirectUrl
        }
    };

    getForm = () => {
        let form = Object.assign({}, this.state.form);
        form.content = form.content.toHTML();
        form.sectionId = {id: form.sectionId};

        //modify url
        if(form.url.trim().length !== 0){
            if(form.url.trim().indexOf("www") === -1){
                form.url = "https://www." + form.url;
            }else if(form.url.trim().indexOf("www") === 0){
                form.url = "https://" + form.url;
            }
        }
        return form;
    };

    onImageSelect = (pictureFiles, pictureDataURLs) => {
        utils.common.fileToBase64(pictureFiles[pictureFiles.length - 1])
            .then((res) => {
                let form = this.state.form;
                form.resources.push({
                    content: res,
                    title: form.resources.length + 1,
                    description: 'temp description'
                });
                this.setState({
                    form: form
                })
            })
            .catch(e => console.log(e));
    };

    clearForm = () => {
        this.setState({
            form: {
                section: 4,
                title: '',
                description: '',
                content: BraftEditor.createEditorState('<p/>'),
                time: (new Date()),
                url: '',
                resources: [],
                isDirectUrl: true
            },
        })
    };

    insertVideo = (text) => {
        let form = this.state.form;
        text = "[YouTube: " + text + "]";
        form.content = ContentUtils.insertText(this.state.form.content, text);
        this.setState({
            form: form
        })
    }

    insertImg = (text) => {
        let form = this.state.form;
        text = "[img: " + text + "]";
        form.content = ContentUtils.insertText(this.state.form.content, text);
        this.setState({
            form: form
        })
    }

    renderVideoDialog = () => {
        return (
            <div>
              <Dialog open={this.state.videoDialog} onClose={() => {console.log('close')}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">添加视频</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    请填写YouTube 视频 ID, 添加视频时请确认视频 ID 准, 添加完视频请确保视频在单独一行
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="YouTube Video ID"
                    fullWidth
                    onChange={(event) => {
                        this.setState({videoDialogText: event.target.value})
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                        window.open('https://www.youtube.com/watch?v=' + this.state.videoDialogText.trim(),'_blank');
                      }} color="primary">
                    查找
                  </Button>
                  <Button onClick={() => {this.setState({videoDialog: false, videoDialogText: ''})}} color="primary">
                    取消
                  </Button>
                  <Button onClick={() => {
                      this.insertVideo(this.state.videoDialogText);
                      this.setState({videoDialog: false, videoDialogText: ''});
                    }} color="primary">
                    添加
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }

    renderImgDialog = () => {
        return (
            <div>
              <Dialog open={this.state.imgDialog} onClose={() => {console.log('close')}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">添加图片</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    请填写图片Tag ID(可在图片预览去找到), 添加视频时请确认图片Tag ID 准, 添加完图片请确保图片在单独一行
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="图片 Tag ID"
                    fullWidth
                    onChange={(event) => {
                        this.setState({imgDialogText: event.target.value})
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={() => {
                        this.setState({imgDialog: false, imgDialogText: ''});
                        window.open('https://www.youtube.com/watch?v=' + this.state.videoDialogText.trim(),'_blank');
                      }} color="primary">
                    查找
                  </Button> */}
                  <Button onClick={() => {this.setState({imgDialog: false, imgDialogText: ''})}} color="primary">
                    取消
                  </Button>
                  <Button onClick={() => {
                      this.insertImg(this.state.imgDialogText);
                      this.setState({imgDialog: false, imgDialogText: ''});
                    }} color="primary">
                    添加
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }

    renderSectionSelect = () => {
        return (
            <FormControl required={true}>
                <InputLabel id="section-select-label">类别</InputLabel>
                <Select
                    labelId="section-select-label"
                    id="section-select"
                    value={this.state.form.sectionId}
                    style={{width: '200px'}}
                    onChange={(event) => {
                        let form = this.state.form;
                        form.sectionId = event.target.value;
                        form.isDirectUrl = (this.state.directUrlSection.indexOf(event.target.value) >= 0);
                        this.setState({form: form})
                    }}
                >
                    {this.state.sections.map(s => {
                        return (<MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        )
    };

    renderImagePreview = () => {
        let index = 0;
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: '100%',
                justifyContent: 'center',
                marginTop: '20px'
            }}>
                <div style={{display: "flex", flexDirection: "row", width: '95%',}}>
                    {this.state.form.resources.map(i => {
                        index++;
                        return (
                            <div style={{marginRight: '10px'}} key={index}>
                                <Paper style={{paddingBottom: '15px'}}>
                                    <img style={{height: '255px'}} src={i.url ? i.url : i.content}
                                         alt={"p1"}/>
                                    {/*<div className={'question'} style={{margin: '10px 0 0px 10px'}}>*/}
                                    {/*    <div className={'question-title'}>标题</div>*/}
                                    {/*    <TextField inputProps={{maxLength: this.state.imgTitleLengthLimit}} required*/}
                                    {/*               style={{width: '90%'}}*/}
                                    {/*               label={"标题(最大长度=" + this.state.imgTitleLengthLimit + ")"}*/}
                                    {/*               value={i.title}*/}
                                    {/*               onChange={(event) => {*/}
                                    {/*                   let form = this.state.form;*/}
                                    {/*                   for (let j = 0; j < form.resources.length; j++) {*/}
                                    {/*                       let img = form.resources[j];*/}
                                    {/*                       if (img.id === i.id) {*/}
                                    {/*                           img.title = event.target.value;*/}
                                    {/*                           form.resources[j] = img;*/}
                                    {/*                           break;*/}
                                    {/*                       }*/}
                                    {/*                   }*/}
                                    {/*                   this.setState({form: form})*/}
                                    {/*               }}/>*/}
                                    {/*</div>*/}
                                    <div className={'question'} style={{margin: '10px 0 0px 10px'}}>
                                        <div className={'question-description'}>Tag Id:</div>
                                        <div className={'question-description'} style={{fontWeight: 'bold'}}>{i.title}</div>
                                    </div>
                                    <div className={'question'} style={{margin: '10px 0 0px 10px'}}>
                                        <div className={'question-description'}>简介</div>
                                        <TextField inputProps={{maxLength: this.state.imgDescriptionLengthLimit}}
                                                   required
                                                   style={{width: '90%'}}
                                                   label={"简介(最大长度=" + this.state.imgDescriptionLengthLimit + ")"}
                                                   value={i.description}
                                                   multiline
                                                   onChange={(event) => {
                                                       let form = this.state.form;
                                                       for (let j = 0; j < form.resources.length; j++) {
                                                           let img = form.resources[j];
                                                           if (img.id === i.id) {
                                                               img.description = event.target.value;
                                                               form.resources[j] = img;
                                                               break;
                                                           }
                                                       }
                                                       this.setState({form: form})
                                                   }}/>
                                    </div>
                                    <Button variant="outlined" style={{marginLeft: '10px', marginTop: '10px'}}
                                            onClick={(event) => {
                                                let newResources = [];
                                                this.state.form.resources.forEach((l) => {
                                                    if (l.title !== i.title) {
                                                        newResources.push(l);
                                                    }
                                                });
                                                let lIndex = 0;
                                                newResources.map((l) => {
                                                    lIndex ++;
                                                    l.title = lIndex;
                                                    return l;
                                                });
                                                let form = this.state.form;
                                                form.resources = newResources;
                                                this.setState({form: form});
                                            }} color="primary">
                                        移除图片
                                    </Button>
                                </Paper>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className={this.styles.bodyContainer}>
                {!this.state.isSection ?
                    <div>
                        <div className={'question'}>
                            <div className={'question-title'}>类别选择</div>
                            {this.renderSectionSelect()}
                        </div>
                        <div className={'question'}>
                            <div className={'question-title'}>置顶</div>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={this.state.form.isTop} onChange={(event) => {
                                    let form = this.state.form;
                                    form.isTop = !form.isTop;
                                    this.setState({form: form})
                                }} value="false"
                                />} label="文章置顶"/>
                        </div>
                    </div>
                    : <div/>
                }
                <div className={'question'}>
                    <div className={'question-title'}>标题</div>
                    <TextField inputProps={{maxLength: this.state.titleLengthLimit}} required id="title-required"
                               label={"标题(最大长度=" + this.state.titleLengthLimit + ")"} value={this.state.form.title}
                               onChange={(event) => {
                                   let form = this.state.form;
                                   form.title = event.target.value;
                                   this.setState({form: form})
                               }}/>
                </div>
                {!this.state.isSection ?
                    <div className={'question'}>
                        <div className={'question-title'}>纲要</div>
                        <TextField inputProps={{maxLength: this.state.descriptionLengthLimit}}
                                   id="description-required"
                                   label={"纲要(最大长度=" + this.state.descriptionLengthLimit + ")"}
                                   value={this.state.form.description}
                                   multiline
                                   onChange={(event) => {
                                       let form = this.state.form;
                                       form.description = event.target.value;
                                       this.setState({form: form})
                                   }}/>
                    </div> : <div/>
                }
                {/*<div className={'question'}>*/}
                {/*    <div className={'question-title'}>选择日期</div>*/}
                {/*    <div style={{width: '200px'}}>*/}
                {/*        <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*            <Grid container justify="space-around">*/}
                {/*                <KeyboardDatePicker*/}
                {/*                    disableToolbar*/}
                {/*                    variant="inline"*/}
                {/*                    format="yyyy-MM-dd"*/}
                {/*                    margin="normal"*/}
                {/*                    id="date-picker-inline"*/}
                {/*                    label="Date picker inline"*/}
                {/*                    value={this.state.form.time}*/}
                {/*                    onChange={(date) => {*/}
                {/*                        let form = this.state.form;*/}
                {/*                        form.time = date;*/}
                {/*                        this.setState({*/}
                {/*                            form: form*/}
                {/*                        })*/}
                {/*                    }}*/}
                {/*                    KeyboardButtonProps={{*/}
                {/*                        'aria-label': 'change date',*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*        </MuiPickersUtilsProvider>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={'question'}>
                    <div className={'question-url'}>外部链接</div>
                    <TextField id="url-required"
                               label={"外部链接"} value={this.state.form.url}
                               multiline
                               onChange={(event) => {
                                   let form = this.state.form;
                                   form.url = event.target.value;
                                   this.setState({form: form})
                               }}/>
                </div>
                <div className={'question'}>
                    <div className={'question-title'}>图片</div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={(pictureFiles, pictureDataURLs) => this.onImageSelect(pictureFiles, pictureDataURLs)}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                    {this.renderImagePreview()}
                </div>
                {!this.state.form.isDirectUrl ? 
                    <div className={'question'}>
                        <div className={'question-title'}>内容</div>
                        <div id={'editor-frame'}>
                            <BraftEditor
                                value={this.state.form.content}
                                id={"editor"}
                                controls={this.state.editorControls}
                                extendControls={[{
                                    key: 'video-button',
                                    type: 'button',
                                    text: '视频',
                                    onClick: () => this.setState({videoDialog: true, videoDialogText: ''})
                                  }, {
                                    key: 'img-button',
                                    type: 'button',
                                    text: '已选图片',
                                    onClick: () => this.setState({imgDialog: true, imgDialogText: ''})
                                  }]}
                                media={this.state.mediaControl}
                                onChange={(editorState) => {
                                    if (editorState.toHTML() !== this.state.form.content.toHTML()) {
                                        let form = this.state.form;
                                        form.content = editorState;
                                        console.log(editorState.toHTML());
                                        this.setState({form: form})
                                    }
                                }}
                                onSave={() => console.log('on save')}
                            />
                        </div>
                    </div> : <div/>
                }
                {this.renderVideoDialog()}
                {this.renderImgDialog()}
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        margin: '10px 30px 10px 30px'
    }
});

ArticleForm.propTypes = {
    sections: PropTypes.array,
    isSection: PropTypes.bool,
    article: PropTypes.object
};

const options = {
    defaultColumns: 3,
    defaultRows: 3,
    withDropdown: true,
    exportAttrString: '',
    includeEditors: ["editor"],
};

BraftEditor.use(Table(options));

export default withStyles(styles)(ArticleForm);
