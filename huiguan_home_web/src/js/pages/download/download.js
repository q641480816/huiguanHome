import React, {Component} from 'react';
import {PropTypes, instanceOf} from "prop-types";
import {Route, withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import Banner from '../../component/banner/Banner';
import utils from "../../common/util";
import { isThisSecond } from 'date-fns';
import { da } from 'date-fns/locale';

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docList: []
        };

        this.styles = this.props.classes;
        this.getDocList = this.getDocList.bind(this);
        this.renderList = this.renderList.bind(this);
        this.processDocList = this.processDocList.bind(this);
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

    renderList = () => {
        if(this.state.docList.length > 0){
            let index = 0;
            return this.state.docList.map((d) => {
                index ++;
                return (
                    <a href={d.url} target='_blank' style={{textDecoration: 'none', color: utils.colorScheme.text}}>
                        <div className={this.styles.docTitle}>
                            {index + '. ' + d.name.substring(d.name.indexOf(']') + 1)}
                        </div>
                    </a>
                )
            })
        }else{
            return <div className={this.styles.docTitle}>没有找到资源</div>
        }
    }

    render() {
        return (
            <div className={this.styles.baseContainer}>
                <Banner title={'资源下载'}/>
                <div className={this.styles.bodyContainer}>
                    {this.renderList()}
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    baseContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    bodyContainer: {
        display: 'flex',
        marginTop: '50px',
        marginBottom: '30px',
        flexDirection: 'column',
        alignItems: 'center',
        color: utils.colorScheme.text,
        [theme.breakpoints.down('xs')]: {
            width: '95%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '65%',
        }
    },
    docTitle: {
        fontSiza: '25px',
        marginBottom: '15px',
    }
});

Download.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Download));
