import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import utils from "../../../../common/util";
import {Link} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";


class HomeFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentSection: {
                id3: {
                    id: 3,
                    sub: [4, 7],
                    title: '新闻动态',
                    data: [],
                    resources: []
                },
                id4: {
                    id: 4,
                    sub: [8, 12],
                    title: '服务动态',
                    data: [],
                    resources: []
                }
            }
        };

        this.styles = this.props.classes;

        this.getParentData = this.getParentData.bind(this);
        this.renderParentSection = this.renderParentSection.bind(this);
        this.renderParentCarousel = this.renderParentCarousel.bind(this);
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
                let cs = [];
                data.articleList.forEach(a => {
                    if (a.resource !== null && a.resource !== '') {
                        let res = a.resource;
                        res.sectionNav = (utils.getSection(a.sectionId)).navigation;
                        cs.push(res);
                    }
                });
                parentSection['id' + parentId].data = data.articleList;
                parentSection['id' + parentId].resources = cs;
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
                    {this.renderParentCarousel(parent.resources)}
                    <div style={{height: '15px'}}/>
                    {parent.data.map(a => {
                        let sectionNav = utils.getSection(a.sectionId).navigation;
                        return (
                            <div key={a.id} style={{marginBottom: '10px'}}>
                                <Link key={a.id} target={'_blank'} to={'/b/article' + sectionNav + "/" + a.id}
                                      style={{textDecoration: 'none'}} className={this.styles.articleTitle}>
                                    {a.title + " (" + a.time + ")"}
                                </Link>
                            </div>

                        )
                    })}
                </div>
            );
            doms.push(dom);
        });
        return doms;
    };

    renderParentCarousel = (resources) => {
        return (
            <div>
                {resources.length !== 0 ?
                    <div className={this.styles.carouselContainer}>
                        <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
                            {resources.map(r => {
                                return (
                                    <Link key={r.id} target={'_blank'}
                                          to={'/b/article' + r.sectionNav + "/" + r.articleId}>
                                        <div>
                                            <div className={this.styles.imgContainer}>
                                                <img src={r.url !== null ? r.url : r.content}
                                                     alt={"p1"}/>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </Carousel>
                    </div> : <div/>
                }
            </div>
        );
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
            fontSize: '27.5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '35px',
        }
    },
    articleTitle: {
        fontSize: '17px',
        color: utils.colorScheme.text,
    },
    carouselContainer: {
        marginTop: '15px',
        [theme.breakpoints.down('sm')]: {
            width: '90vw',
        },
        [theme.breakpoints.up('md')]: {
            width: '35vw',
        },
    },
    imgContainer: {
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            width: '90vw',
            height: 'calc(90vw/16*9)'
        },
        [theme.breakpoints.up('md')]: {
            width: '35vw',
            height: 'calc(35vw/16*9)'
        },
    },
});

HomeFeed.propTypes = {};

export default withStyles(styles)(HomeFeed);