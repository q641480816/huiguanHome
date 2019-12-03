import React, {Component} from 'react';
import {
    TextField,
    withStyles,
    Paper,
    Grid,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel, InputLabel, Select, MenuItem, Button
} from "@material-ui/core";
import utils from "../../common/util";
import {
    isMobile
} from "react-device-detect";

import './JoinUs.css';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Apps} from "@material-ui/icons";
import ImageUploader from "react-images-upload";
import Loading from "../../component/loading/Loading";

class JoinUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSide: -1,
            formNormal: {
                nameChinese: '',
                nameEnglish: '',
                nric: '',
                dateOfBirth: new Date(),
                homeTel: '',
                officeTel: '',
                sex: 'M',
                placeOfBirth: '',
                occupation: '',
                nationality: '',
                hp: '',
                email: '',
                origin: '福建省',
                education: '',
                homeAddress: '',
                officeAddress: '',
                otherClubs: '',
                image: '',
                beneficiaries: [{
                    nameChinese: '',
                    nameEnglish: '',
                    sex: 'M',
                    age: '',
                    relationship: '',
                    nric: '',
                    address: ''
                }]
            },
            formYouth: {
                nameChinese: '',
                nameEnglish: '',
                nric: '',
                dateOfBirth: new Date(),
                homeTel: '',
                sex: 'F',
                occupation: '',
                nationality: '',
                hp: '',
                email: '',
                origin: '福建省',
                education: '',
                homeAddress: '',
                otherClubs: '',
                introducedBy: '',
                image: '',
            },
            educationList: [
                '小学',
                '中学',
                '初级学院',
                '理工学院',
                '大学',
                '高级学位'
            ],
            loadingMsg: '',
            isLoading: false
        };

        this.styles = this.props.classes;

        this.prepareFormUI = this.prepareFormUI.bind(this);
        this.prepareBeneficiariesUI = this.prepareBeneficiariesUI.bind(this);
        this.onImageSelect = this.onImageSelect.bind(this);
        this.renderImg = this.renderImg.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);

        this.loading = React.createRef();
    }

    componentDidMount() {
    }

    submit = () => {
        this.toggleLoading("提交中", true);
        let url = utils.protocol + utils.emailUrl;
        let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;

        let date = new Date(form.dateOfBirth);
        form.dateOfBirth = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

        console.log(form);

        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => {
                alert('提交成功');
                this.toggleLoading("", false);
                this.setState({
                    selectedSide: -1,
                    formNormal: {
                        nameChinese: '',
                        nameEnglish: '',
                        nric: '',
                        dateOfBirth: new Date(),
                        homeTel: '',
                        officeTel: '',
                        sex: 'M',
                        placeOfBirth: '',
                        occupation: '',
                        nationality: '',
                        hp: '',
                        email: '',
                        origin: '福建省',
                        education: '',
                        homeAddress: '',
                        officeAddress: '',
                        otherClubs: '',
                        image: '',
                        beneficiaries: [{
                            nameChinese: '',
                            nameEnglish: '',
                            sex: 'M',
                            age: '',
                            relationship: '',
                            nric: '',
                            address: ''
                        }]
                    },
                    formYouth: {
                        nameChinese: '',
                        nameEnglish: '',
                        nric: '',
                        dateOfBirth: new Date(),
                        homeTel: '',
                        sex: 'F',
                        occupation: '',
                        nationality: '',
                        hp: '',
                        email: '',
                        origin: '福建省',
                        education: '',
                        homeAddress: '',
                        otherClubs: '',
                        introducedBy: '',
                        image: '',
                    },
                });
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
            })
            .catch(e => {
                this.toggleLoading("", false);
                alert('提交失败');
            });

    };

    toggleLoading = (msg, isLoading) => {
        this.setState({
            loadingMsg: msg,
            isLoading: isLoading
        });
        this.loading.current.toggleLoading(isLoading);
    };

    cancel = () => {
        this.setState({
            selectedSide: -1,
            formNormal: {
                nameChinese: '',
                nameEnglish: '',
                nric: '',
                dateOfBirth: new Date(),
                homeTel: '',
                officeTel: '',
                sex: 'M',
                placeOfBirth: '',
                occupation: '',
                nationality: '',
                hp: '',
                email: '',
                origin: '福建省',
                education: '',
                homeAddress: '',
                officeAddress: '',
                otherClubs: '',
                image: '',
                beneficiaries: [{
                    nameChinese: '',
                    nameEnglish: '',
                    sex: 'M',
                    age: '',
                    relationship: '',
                    nric: '',
                    address: ''
                }]
            },
            formYouth: {
                nameChinese: '',
                nameEnglish: '',
                nric: '',
                dateOfBirth: new Date(),
                homeTel: '',
                sex: 'F',
                occupation: '',
                nationality: '',
                hp: '',
                email: '',
                origin: '福建省',
                education: '',
                homeAddress: '',
                otherClubs: '',
                introducedBy: '',
                image: '',
            },
        });
    };

    onImageSelect = (pictureFiles, pictureDataURLs) => {
        utils.common.fileToBase64(pictureFiles[pictureFiles.length - 1])
            .then((res) => {
                let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                form.image = res;
                this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
            })
            .catch(e => console.log(e));
    };

    prepareFormUI = () => {
        return (
            <div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'}>中文姓名</div>
                        <TextField required className={'textFiled'}
                                   label={"中文姓名"}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.nameChinese : this.state.formYouth.nameChinese}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.nameChinese = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                    <div className={'question-j'}>
                        <div className={'question-title'}>英文姓名</div>
                        <TextField required className={'textFiled'}
                                   label={"英文姓名"}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.nameEnglish : this.state.formYouth.nameEnglish}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.nameEnglish = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'}>身份证号码</div>
                        <TextField required className={'textFiled'}
                                   label={"身份证号码"}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.nric : this.state.formYouth.nric}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.nric = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                    <div className={'question-j'}>
                        <div className={'question-title'}>出生日期</div>
                        <div style={{width: '200px'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy-MM-dd"
                                        margin="normal"
                                        label="Date picker inline"
                                        value={this.state.selectedSide === 1 ? this.state.formNormal.dateOfBirth : this.state.formYouth.dateOfBirth}
                                        onChange={(date) => {
                                            let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                            form.dateOfBirth = date;
                                            this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                </div>
                <div className={'questionBox'}>
                    {this.state.selectedSide === 1 ?
                        <div className={'question-j'}>
                            <div className={'question-title'}>办公电话</div>
                            <TextField required className={'textFiled'}
                                       label={"办公电话"}
                                       value={this.state.selectedSide === 1 ? this.state.formNormal.officeTel : this.state.formYouth.officeTel}
                                       onChange={(event) => {
                                           let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                           form.officeTel = event.target.value;
                                           this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                       }}/>
                        </div> : <div/>
                    }
                    <div className={'question-j'}>
                        <div className={'question-title'}>家庭电话</div>
                        <TextField required className={'textFiled'}
                                   label={"家庭电话"}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.homeTel : this.state.formYouth.homeTel}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.homeTel = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'}>性别</div>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1"
                                        value={this.state.selectedSide === 1 ? this.state.formNormal.sex : this.state.formYouth.sex}
                                        onChange={(event) => {
                                            let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                            form.sex = event.target.value;
                                            this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                        }}>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <FormControlLabel value="F" control={<Radio/>} label="Female"/>
                                    <FormControlLabel value="M" control={<Radio/>} label="Male"/>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {this.state.selectedSide === 1 ?
                        <div className={'question-j'}>
                            <div className={'question-title'}>出生地</div>
                            <TextField required className={'textFiled'}
                                       label={"出生地"}
                                       value={this.state.selectedSide === 1 ? this.state.formNormal.placeOfBirth : this.state.formYouth.placeOfBirth}
                                       onChange={(event) => {
                                           let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                           form.placeOfBirth = event.target.value;
                                           this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                       }}/>
                        </div> : <div/>
                    }
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'}>{this.state.selectedSide === 1 ? '职业' : '职业 / 学校'}</div>
                        <TextField required className={'textFiled'}
                                   label={this.state.selectedSide === 1 ? '职业' : '职业 / 学校'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.occupation : this.state.formYouth.occupation}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.occupation = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                    <div className={'question-j'}>
                        <div className={'question-title'}>国籍</div>
                        <TextField required className={'textFiled'}
                                   label={'国籍'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.nationality : this.state.formYouth.nationality}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.nationality = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'}>移动手机</div>
                        <TextField required className={'textFiled'}
                                   label={'移动手机'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.hp : this.state.formYouth.hp}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.hp = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                    <div className={'question-j'}>
                        <div className={'question-title'}>邮箱地址</div>
                        <TextField required className={'textFiled'}
                                   label={'邮箱地址'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.email : this.state.formYouth.email}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.email = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'} style={{width: '70%'}}>祖籍</div>
                        <TextField required className={'textFiled'} style={{width: '100%'}}
                                   label={'祖籍(省/市/县)'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.origin : this.state.formYouth.origin}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.origin = (event.target.value.indexOf('福建省') === -1 ? '福建省' : '') + event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'}>
                        <div className={'question-title'}>最高学历</div>
                        <FormControl required={true}>
                            <InputLabel id="section-select-label">最高学历</InputLabel>
                            <Select
                                labelId="section-select-label"
                                value={this.state.selectedSide === 1 ? this.state.formNormal.education : this.state.formYouth.education}
                                style={{width: '300px'}}
                                onChange={(event) => {
                                    let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                    form.education = event.target.value;
                                    this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                }}
                            >
                                {this.state.educationList.map(s => {
                                    return (<MenuItem key={s} value={s}>{s}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={'question-j'}>
                        <div className={'question-title'}>家庭住址</div>
                        <TextField required className={'textFiled'}
                                   label={'家庭住址'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.homeAddress : this.state.formYouth.homeAddress}
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.homeAddress = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
                <div className={'questionBox'}>
                    {this.state.selectedSide === 1 ?
                        <div className={'question-j'}>
                            <div className={'question-title'}>办公室地址</div>
                            <TextField required className={'textFiled'}
                                       label={'办公室地址'}
                                       value={this.state.selectedSide === 1 ? this.state.formNormal.officeAddress : this.state.formYouth.officeAddress}
                                       onChange={(event) => {
                                           let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                           form.officeAddress = event.target.value;
                                           this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                       }}/>
                        </div> : <div/>
                    }
                    {this.state.selectedSide === 2 ?
                        <div className={'question-j'}>
                            <div className={'question-title'}>介绍人</div>
                            <TextField required className={'textFiled'}
                                       label={'介绍人'}
                                       value={this.state.selectedSide === 1 ? this.state.formNormal.introducedBy : this.state.formYouth.introducedBy}
                                       onChange={(event) => {
                                           let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                           form.introducedBy = event.target.value;
                                           this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                       }}/>
                        </div> : <div/>
                    }
                </div>
                <div className={'questionBox'}>
                    <div className={'question-j'} style={{width: '800px'}}>
                        <div
                            className={'question-title'}>{this.state.selectedSide === 1 ? '参与之团体与职务' : '其他(请填写您的专长, 兴趣等)'}</div>
                        <TextField style={{width: '800px'}}
                                   label={this.state.selectedSide === 1 ? '参与之团体与职务' : '其他(请填写您的专长, 兴趣等)'}
                                   value={this.state.selectedSide === 1 ? this.state.formNormal.otherClubs : this.state.formYouth.otherClubs}
                                   multiline
                                   onChange={(event) => {
                                       let form = this.state.selectedSide === 1 ? this.state.formNormal : this.state.formYouth;
                                       form.otherClubs = event.target.value;
                                       this.setState(this.state.selectedSide === 1 ? {formNormal: form} : {formYouth: form})
                                   }}/>
                    </div>
                </div>
            </div>
        );
    };

    prepareBeneficiariesUI = () => {
        let index = -1;
        return this.state.formNormal.beneficiaries.map(b => {
            index++;
            return (
                <div key={index}>
                    <div className={'question-title'}
                         style={{fontSize: '22px', marginBottom: '20px'}}>受荫人 {index + 1}</div>
                    <div className={'questionBox'}>
                        <div className={'question-j'}>
                            <div className={'question-title'}>中文姓名</div>
                            <TextField required className={'textFiled'}
                                       label={"中文姓名"}
                                       value={b.nameChinese}
                                       onChange={(event) => {
                                           let form = this.state.formNormal;
                                           form.beneficiaries[index].nameChinese = event.target.value;
                                           this.setState({formNormal: form})
                                       }}/>
                        </div>
                        <div className={'question-j'}>
                            <div className={'question-title'}>英文姓名</div>
                            <TextField required className={'textFiled'}
                                       label={"英文姓名"}
                                       value={b.nameEnglish}
                                       onChange={(event) => {
                                           let form = this.state.formNormal;
                                           form.beneficiaries[index].nameEnglish = event.target.value;
                                           this.setState({formNormal: form})
                                       }}/>
                        </div>
                    </div>
                    <div className={'questionBox'}>
                        <div className={'question-j'}>
                            <div className={'question-title'}>性别</div>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={b.sex}
                                            onChange={(event) => {
                                                let form = this.state.formNormal;
                                                form.beneficiaries[index].sex = event.target.value;
                                                this.setState({formNormal: form})
                                            }}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormControlLabel value="F" control={<Radio/>} label="Female"/>
                                        <FormControlLabel value="M" control={<Radio/>} label="Male"/>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={'question-j'}>
                            <div className={'question-title'}>年龄</div>
                            <TextField required className={'textFiled'}
                                       label={"年龄"}
                                       value={b.age}
                                       onChange={(event) => {
                                           let form = this.state.formNormal;
                                           form.beneficiaries[index].age = event.target.value;
                                           this.setState({formNormal: form})
                                       }}/>
                        </div>
                    </div>
                    <div className={'questionBox'}>
                        <div className={'question-j'}>
                            <div className={'question-title'}>关系</div>
                            <TextField required className={'textFiled'}
                                       label={"关系"}
                                       value={b.relationship}
                                       onChange={(event) => {
                                           let form = this.state.formNormal;
                                           form.beneficiaries[index].relationship = event.target.value;
                                           this.setState({formNormal: form})
                                       }}/>
                        </div>
                        <div className={'question-j'}>
                            <div className={'question-title'}>身份证号码</div>
                            <TextField required className={'textFiled'}
                                       label={"身份证号码"}
                                       value={b.nric}
                                       onChange={(event) => {
                                           let form = this.state.formNormal;
                                           form.beneficiaries[index].nric = event.target.value;
                                           this.setState({formNormal: form})
                                       }}/>
                        </div>
                    </div>
                    <div className={'questionBox'}>
                        <div className={'question-j'}>
                            <div className={'question-title'}>地址</div>
                            <TextField required className={'textFiled'}
                                       label={"地址"}
                                       value={b.address}
                                       onChange={(event) => {
                                           let form = this.state.formNormal;
                                           form.beneficiaries[index].address = event.target.value;
                                           this.setState({formNormal: form})
                                       }}/>
                        </div>
                    </div>
                </div>
            )
        })
    };

    renderImg = () => {
        let img = this.state.selectedSide === 1 ? this.state.formNormal.image : this.state.formYouth.image;
        if (img !== null && img.length != 0) {
            return (
                <img style={{height: '200px'}} src={img}
                     alt={"p1"}/>
            )
        } else {
            return <div/>
        }
    };

    render() {
        if (isMobile) {
            return (
                <div className={this.styles.baseContainer}>
                    <div className={this.styles.titleWrapper}>此页面不支持手机浏览</div>
                </div>
            )
        } else {
            return (
                <div className={this.styles.baseContainer}>
                    {/*<div className={this.styles.titleWrapper}>会馆入会原则</div>*/}
                    {/*<div className={this.styles.titleWrapper} style={{marginTop: 0}}>Membership Rules</div>*/}
                    <div className={this.styles.titleWrapper}>欢迎加入晋江会馆</div>
                    {this.state.selectedSide === -1 ?
                        <div className={this.styles.preContainer}>
                            <div className={this.styles.buttonContainer} style={{marginTop: '40px'}}>
                                <div className={this.styles.lamButton} onClick={() => {
                                    this.setState({selectedSide: 1})
                                }}>入会申请入口
                                </div>
                                <div style={{width: '100px'}}/>
                                <div className={this.styles.lamButton} onClick={() => {
                                    this.setState({selectedSide: 2})
                                }}>青年团申请入口
                                </div>
                            </div>
                        </div> : <div/>}
                    {this.state.selectedSide !== -1 ?
                        <div className={this.styles.baseContainer}>
                            <div className={this.styles.mask} style={!this.state.isLoading ? {display: 'none'} : {}}>
                                <Loading loadingMessage={"提交中"} isMax={true} initialState={false}
                                         ref={this.loading}/>
                            </div>
                            <Paper style={{width: '100%', padding: '25px 20px 25px 20px', marginTop: '30px'}}>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <div className={this.styles.titleWrapper}>半身正面近照</div>
                                    {this.renderImg()}
                                    <div style={{width: '80%'}}>
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText={'选择图片'}
                                            onChange={(pictureFiles, pictureDataURLs) => this.onImageSelect(pictureFiles, pictureDataURLs)}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={2097152}
                                        />
                                    </div>
                                </div>
                            </Paper>
                            <Paper style={{width: '100%', padding: '25px 20px 25px 20px', marginTop: '30px'}}>
                                <div>
                                    {this.prepareFormUI()}
                                </div>
                            </Paper>
                            {this.state.selectedSide === 1 ?
                                <Paper style={{width: '100%', padding: '25px 20px 25px 20px', marginTop: '30px'}}>
                                    <div>
                                        {this.prepareBeneficiariesUI()}
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        <Button onClick={(event) => {
                                            let form = this.state.formNormal;
                                            form.beneficiaries.push({
                                                nameChinese: '',
                                                nameEnglish: '',
                                                sex: 'M',
                                                age: '',
                                                relationship: '',
                                                nric: '',
                                                address: ''
                                            });
                                            this.setState({
                                                formNormal: form
                                            })
                                        }} variant="outlined" color="inherit">
                                            <div>增加受荫人</div>
                                        </Button>
                                    </div>
                                </Paper> : <div/>}
                            <div style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}>
                                <Button style={{marginTop: '20px'}} onClick={(event) => {
                                    this.cancel();
                                }} variant="outlined" color="inherit">
                                    <div>取消</div>
                                </Button>
                                <div style={{width: '150px'}}/>
                                <Button style={{marginTop: '20px'}} onClick={(event) => {
                                    this.submit();
                                }} variant="outlined" color="inherit">
                                    <div>提交</div>
                                </Button>
                            </div>
                        </div> : <div/>
                    }
                </div>
            );
        }
    }

}

const styles = theme => ({
    baseContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleWrapper: {
        color: utils.colorScheme.text,
        marginTop: '20px',
        marginBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '22.5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '30px',
        },
    },
    preContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    contentWrapper: {
        color: utils.colorScheme.text,
        marginTop: '1px',
        fontSize: '17px',
    },
    buttonContainer: {
        width: '100',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    lamButton: {
        fontSize: '25px',
        backgroundColor: utils.colorScheme.secondary,
        color: utils.colorScheme.tertiary,
        fontWeight: 'normal',
        padding: '7px 15px 7px 15px',
        borderRadius: '15px',
        width: '200px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    mask: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    }
});

JoinUs.propTypes = {};

export default withStyles(styles)(JoinUs);
