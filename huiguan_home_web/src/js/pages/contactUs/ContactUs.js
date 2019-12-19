import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

import SectionDivider from "../../component/sectionDivider/SectionDivider";
import utils from "../../common/util";

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            contactNumber: '',
            type: '提问',
            comment: '',
            isSubmited: false,
            types:['提问', '反馈', '其他'],
            labelWidth: 0
        };

        this.styles = this.props.classes;

        this.sendFeedback = this.sendFeedback.bind(this);
    }

    sendFeedback = () => {
        this.setState({
            isSubmited: true
        })

        if(this.state.name.trim().length !== 0 && (this.state.email.trim().length !== 0 || this.state.contactNumber.trim().length !== 0) && this.state.comment.trim().length !== 0){
            let content = '\r\n';

            content += "姓名：" + this.state.name + "\r\n";
            if(this.state.email.trim().length > 0){
                content += "电子邮箱：" + this.state.email + "\r\n";
            }
            if(this.state.contactNumber.trim().length > 0){
                content += "联系电话：" + this.state.contactNumber + "\r\n";
            }

            content += "类别：" + this.state.type + "\r\n";
            content += "内容：" + this.state.comment;

            let url = utils.protocol + utils.emailUrl + '/contact';

            fetch(url, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    replyTo: this.state.email,
                    content: content
                })
            })
                .then(response => response.json())
                .then(data => {
                    if(data.httpStatus === 200){
                        alert('感谢您的反馈');
                    }else{
                        alert(data.errorMessage);
                    }
                })
                .catch(e => {
                    console.log(e);
                    alert('出现错误了')
                });

            console.log(content)
        }else{
            alert("请填写必要信息！");
        }
    }

    render() {
        return (
            <div id='container' style={{display: "flex", flexDirection: "column", alignItems: 'center', 
                width: '100vw'}}>
                <div className={this.styles.title} style={{marginTop: '15px', marginBottom: '25px', color: utils.colorScheme.secondary}}>寻找并联系我们</div>
                <div className={this.styles.contentWrapper}>
                    <Paper className={this.styles.contentBody}>
                        <Paper className={this.styles.contentBody} square={true}>
                            <div className={this.styles.mapWrapper}>
                                <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                                    src="http://maps.google.com.sg/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=29+Bukit+Pasoh+Road+%2304-01+Singapore+089843&amp;sll=1.359,103.818&amp;sspn=0.357641,0.676346&amp;ie=UTF8&amp;hq=&amp;hnear=29+Bukit+Pasoh+Rd,+089843&amp;ll=1.279203,103.84044&amp;spn=0.005588,0.010568&amp;t=m&amp;z=14&amp;output=embed"></iframe>
                            </div>
                        </Paper>
                        <div className={this.styles.formContainer}>
                            <div style={{fontSize: '18px', fontWeight: 'bold', color: utils.colorScheme.text, marginBottom: '20px'}}>
                                <span className={this.styles.titlePrefix}>如有任何反馈或</span>
                                想联系我们， 请填写下表：
                                </div>
                            <div className={this.styles.questionRow}>
                                <TextField
                                    className={this.styles.question}
                                    required
                                    error={this.state.isSubmited && this.state.name.trim().length === 0}
                                    margin={'dense'}
                                    id="outlined-name"
                                    label="姓名"
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({
                                            name: event.target.value,
                                            isSubmited: false
                                        })
                                    }}
                                    />
                                <TextField
                                    className={this.styles.question}
                                    required
                                    margin={'dense'}
                                    id="outlined-email"
                                    label="电子邮箱"
                                    type='email'
                                    error={this.state.isSubmited && this.state.email.trim().length === 0 && this.state.contactNumber.trim().length === 0}
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({
                                            email: event.target.value,
                                            isSubmited: false
                                        })
                                    }}
                                    />
                            </div>
                            <div className={this.styles.questionRow}>
                                <TextField
                                    className={this.styles.question}
                                    required
                                    margin={'dense'}
                                    error={this.state.isSubmited && this.state.email.trim().length === 0 && this.state.contactNumber.trim().length === 0}
                                    id="outlined-phone"
                                    label="联系电话"
                                    type='tel'
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({
                                            contactNumber: event.target.value,
                                            isSubmited: false
                                        })
                                    }}
                                    />
                                 <FormControl variant="outlined" className={this.styles.question} margin={'dense'}>
                                    <InputLabel id="type-select-outlined-lable" style={{backgroundColor: 'white'}}>
                                        类别
                                    </InputLabel>
                                    <Select
                                        labelId="type-select-outlined"
                                        id="type-select-outlined"
                                        value={this.state.type}
                                        onChange={(event) => {
                                            this.setState({
                                                type: event.target.value,
                                                isSubmited: false
                                            })
                                        }}
                                        >
                                            {this.state.types.map((t) => {
                                                return <MenuItem key={t} value={t}>{t}</MenuItem>
                                            })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={this.styles.questionRow}>
                                <TextField
                                    className={this.styles.comment}
                                    margin={'dense'}
                                    id="outlined-multiline-comment"
                                    label={this.state.type}
                                    multiline
                                    error={this.state.isSubmited && this.state.comment.trim().length === 0}
                                    rows="4"
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({
                                            comment: event.target.value,
                                            isSubmited: false
                                        })
                                    }}
                                    />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '15px', marginBottom: '25px'}}>
                                <Button onClick={(event) => this.sendFeedback()} variant="outlined" color="inherit"
                                        style={{display: 'flex', flexDirection: 'row'}}>
                                    <SendIcon/>
                                    <div style={{paddingLeft: '7.5px'}}>发送</div>
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    title: {
        textTransform: 'uppercase',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: '27.5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '37.5px',
        }
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '65%'
        },
    },
    contentBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    },
    mapWrapper: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(90vw * 3/4)',
        },
        [theme.breakpoints.up('sm')]: {
            height: 'calc(65vw * 2/4)',
        },
    },
    formContainer: {
        width: '100%',
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'gray'
    },
    questionRow: {
        width: '96%',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '20px',
        },
    },
    titlePrefix: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'inline'
        },
    },
    question: {
        [theme.breakpoints.down('xs')]: {
            width: '96%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '48%'
        },
    },
    comment: {
        [theme.breakpoints.down('xs')]: {
            width: '96%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%'
        },
    }

});

ContactUs.propTypes = {};

export default withStyles(styles)(ContactUs);
