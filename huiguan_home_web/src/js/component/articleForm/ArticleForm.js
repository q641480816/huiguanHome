import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    withStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Grid, Paper, Button
} from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BraftEditor from 'braft-editor';
import ImageUploader from 'react-images-upload';

import './ArticleForm.css'
import './editor.css'
import utils from "../../common/util";

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                sectionId: {id: 1, title: '会馆简介'},
                title: '',
                description: '',
                content: BraftEditor.createEditorState('<p/>'),
                time: (new Date()),
                url: '',
                resources: []
            },
            sections: [],
            titleLengthLimit: 30,
            imgTitleLengthLimit: 10,
            descriptionLengthLimit: 150,
            imgDescriptionLengthLimit: 30,
            isSection: false,
            editorControls: [
                'font-size', 'line-height', 'letter-spacing', 'separator',
                'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
                'headings', 'list-ul', 'list-ol', 'blockquote', 'separator',
                'link', 'separator', 'hr', 'separator', 'code', 'separator', 'clear'
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
            }
        };

        this.styles = this.props.classes;

        this.getForm = this.getForm.bind(this);
        this.onImageSelect = this.onImageSelect.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.prepareForm = this.prepareForm.bind(this);
        this.renderSectionSelect = this.renderSectionSelect.bind(this);
        this.renderImagePreview = this.renderImagePreview.bind(this);
    }

    componentDidMount() {
        this.setState({
            sections: this.props.sections ? this.props.sections : this.state.sections,
            isSection: this.props.isSection ? this.props.isSection : this.state.isSection,
            form: this.props.article ? this.prepareForm(this.props.sections, this.props.article) : {
                sectionId: {id: 1, title: '会馆简介'},
                title: '',
                description: '',
                content: BraftEditor.createEditorState('<p/>'),
                time: (new Date()),
                url: '',
                resources: []
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sections.length !== this.props.sections.length) {
            this.setState({
                sections: this.props.sections,
                isSection: this.props.isSection ? this.props.isSection : this.state.isSection,
                form: this.props.article ? this.prepareForm(this.props.sections, this.props.article) : {
                    sectionId: {id: 1, title: '会馆简介'},
                    title: '',
                    description: '',
                    content: BraftEditor.createEditorState('<p/>'),
                    time: (new Date()),
                    url: '',
                    resources: []
                }
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
            sectionId: section,
            title: article.title,
            description: article.description,
            content: BraftEditor.createEditorState(article.content),
            time: (new Date(article.time)),
            url: article.url ? article.url : '',
            resources: article.resources
        }
    };

    getForm = () => {
        let form = Object.assign({}, this.state.form);
        form.content = form.content.toHTML();
        form.sectionId = {id: form.sectionId.id};
        return form;
    };

    onImageSelect = (pictureFiles, pictureDataURLs) => {
        utils.common.fileToBase64(pictureFiles[pictureFiles.length - 1])
            .then((res) => {
                let form = this.state.form;
                form.resources.push({
                    content: res,
                    title: 'temp title',
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
                section: '',
                title: '',
                description: '',
                content: '',
                time: (new Date()),
                url: '',
                resources: []
            },
        })
    };

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
                        this.setState({form: form})
                    }}
                >
                    {this.state.sections.map(s => {
                        return (<MenuItem key={s.id} value={s}>{s.title}</MenuItem>)
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
                                    <div className={'question'} style={{margin: '10px 0 0px 10px'}}>
                                        <div className={'question-title'}>标题</div>
                                        <TextField inputProps={{maxLength: this.state.imgTitleLengthLimit}} required
                                                   style={{width: '90%'}}
                                                   label={"标题(最大长度=" + this.state.imgTitleLengthLimit + ")"}
                                                   value={i.title}
                                                   onChange={(event) => {
                                                       let form = this.state.form;
                                                       for (let j = 0; j < form.resources.length; j++) {
                                                           let img = form.resources[j];
                                                           if (img.id === i.id) {
                                                               img.title = event.target.value;
                                                               form.resources[j] = img;
                                                               break;
                                                           }
                                                       }
                                                       this.setState({form: form})
                                                   }}/>
                                    </div>
                                    <div className={'question'} style={{margin: '10px 0 0px 10px'}}>
                                        <div className={'question-description'}>简介</div>
                                        <TextField inputProps={{maxLength: this.state.imgDescriptionLengthLimit}}
                                                   required
                                                   style={{width: '90%'}}
                                                   label={"标题(最大长度=" + this.state.imgDescriptionLengthLimit + ")"}
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
                                                    if (l.id !== i.id) {
                                                        newResources.push(l);
                                                    }
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
                    <div className={'question'}>
                        <div className={'question-title'}>类别选择</div>
                        {this.renderSectionSelect()}
                    </div> : <div/>
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
                <div className={'question'}>
                    <div className={'question-title'}>选择日期</div>
                    <div style={{width: '200px'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={this.state.form.time}
                                    onChange={(date) => {
                                        let form = this.state.form;
                                        form.time = date;
                                        this.setState({
                                            form: form
                                        })
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className={'question'}>
                    <div className={'question-url'}>外部链接</div>
                    <TextField inputProps={{maxLength: 100}} id="url-required"
                               label={"外部链接(最大长度=" + 100 + ")"} value={this.state.form.url}
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
                <div className={'question'}>
                    <div className={'question-title'}>内容</div>
                    <div id={'editor-frame'}>
                        <BraftEditor
                            value={this.state.form.content}
                            controls={this.state.editorControls}
                            media={this.state.mediaControl}
                            onChange={(editorState) => {
                                if (editorState.toHTML() !== this.state.form.content.toHTML()) {
                                    let form = this.state.form;
                                    form.content = editorState;
                                    this.setState({form: form})
                                }
                            }}
                            onSave={() => console.log('on save')}
                        />
                    </div>
                </div>
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

export default withStyles(styles)(ArticleForm);
