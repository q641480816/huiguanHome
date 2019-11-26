import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles, FormControl, InputLabel, Select, MenuItem, TextField} from "@material-ui/core";
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
                section: '',
                title: '',
                description: '',
                content: ''
            },
            sections: [],
            titleLengthLimit: 30,
            descriptionLengthLimit: 100,
            editorControls: [
                'font-size', 'line-height', 'letter-spacing', 'separator',
                'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
                'headings', 'list-ul', 'list-ol', 'blockquote', 'separator',
                'link', 'separator', 'hr', 'separator',
                'clear'
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
        this.renderSectionSelect = this.renderSectionSelect.bind(this);
        this.onImageSelect = this.onImageSelect.bind(this);
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

    onImageSelect = (pictureFiles, pictureDataURLs) => {
        utils.common.fileToBase64(pictureFiles[0])
            .then((res) => console.log(res))
            .catch(e => console.log(e));
        console.log();
    };

    renderSectionSelect = () => {
        return (
            <FormControl required={true}>
                <InputLabel id="section-select-label">类别</InputLabel>
                <Select
                    labelId="section-select-label"
                    id="section-select"
                    value={this.state.form.section}
                    style={{width: '200px'}}
                    onChange={(event) => {
                        let form = this.state.form;
                        form.section = event.target.value;
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

    render() {
        return (
            <div className={this.styles.bodyContainer}>
                <div className={'question'}>
                    <div className={'question-title'}>类别选择</div>
                    {this.renderSectionSelect()}
                </div>
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
                <div className={'question'}>
                    <div className={'question-title'}>纲要</div>
                    <TextField inputProps={{maxLength: this.state.descriptionLengthLimit}} required
                               id="description-required"
                               label={"纲要(最大长度=" + this.state.descriptionLengthLimit + ")"}
                               value={this.state.form.description}
                               multiline
                               onChange={(event) => {
                                   let form = this.state.form;
                                   form.description = event.target.value;
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
                </div>
                <div className={'question'}>
                    <div className={'question-title'}>内容</div>
                    <div id={'editor-frame'}>
                        <BraftEditor
                            value={this.state.form.content}
                            controls={this.state.editorControls}
                            media={this.state.mediaControl}
                            onChange={(editorState) => {
                                let content = editorState.toHTML();
                                if (content !== this.state.form.content) {
                                    let form = this.state.form;
                                    form.content = content;
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
    sections: PropTypes.array.isRequired
};

export default withStyles(styles)(ArticleForm);
