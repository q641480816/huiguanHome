import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import utils from "../../../../common/util";
import {Link} from "react-router-dom";


class HomeFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentSection: {
                id3: {
                    id: 3,
                    sub: [4, 7],
                    title: '新闻动态',
                    data: []
                },
                id4: {
                    id: 4,
                    sub: [8, 12],
                    title: '服务动态',
                    data: []
                }
            }
        };

        this.styles = this.props.classes;

        this.getParentData = this.getParentData.bind(this);
        this.renderParentSection = this.renderParentSection.bind(this);
    }

    componentDidMount() {
        this.getParentData(3);
        this.getParentData(4);
    }

    getParentData = (parentId) => {
        let parent = this.state.parentSection['id' + parentId];
        let url = utils.protocol + utils.baseUrl + '/short/latest/' + parent.sub[0] + '/' + parent.sub[1];

        fetch(url, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                let parentSection = this.state.parentSection;
                parentSection['id' + parentId].data = data.articleList;
                this.setState({parentSection: parentSection});
            })
            .catch(e => {
                console.log(e);
            });
    };

    renderParentSection = () => {
        let doms = [];
        Object.keys(this.state.parentSection).forEach(k => {
            let parent = this.state.parentSection[k];
            let dom = (
                <div key={k} className={this.styles.sectionContainer}>
                    <div className={this.styles.parentTitle}>{parent.title}</div>
                    <div style={{height: '15px'}}/>
                    {parent.data.map(a => {
                        let sectionNav = utils.getSection(a.sectionId).navigation;
                        return (
                            <Link key={a.id} target={'_blank'} to={'/b/article' + sectionNav + "/" + a.id} style={{textDecoration: 'none'}}>
                                <div className={this.styles.articleTitle}>{a.title + " (" + a.time + ")"}</div>
                            </Link>
                        )
                    })}
                </div>
            );
            doms.push(dom);
        });
        return doms;
    };

    render() {
        return (
            <div className={this.styles.bodyContainer}>
                {this.renderParentSection()}
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            justifyContent: 'center',
        }
    },
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            alignItems: 'center',
            marginTop: '15px'
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
        }
    },
    parentTitle: {
        color: utils.colorScheme.secondary,
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: '17.5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '35px',
        }
    },
    articleTitle: {
        fontSize: '17px',
        color: utils.colorScheme.text,
        marginBottom: '10px'
    }
});

HomeFeed.propTypes = {};

export default withStyles(styles)(HomeFeed);
