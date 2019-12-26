import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route, withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import YouTubePlayer from 'youtube-player';

import './Article.css';
import utils from "../../common/util";
import Banner from "../banner/Banner";
import {Carousel} from "react-responsive-carousel";
import parse from "html-react-parser";
import Loading from "../loading/Loading";

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleId: 0,
            article: null,
            section: {title: '', navigation: '', isRenderList: true},
            vedios: [],
            imgDimensions: {}
        };

        this.styles = this.props.classes;

        this.getArticle = this.getArticle.bind(this);
        this.renderArticle = this.renderArticle.bind(this);
        this.renderCarousel = this.renderCarousel.bind(this);
        this.processArticle = this.processArticle.bind(this);
        this.initVedio = this.initVedio.bind(this);
        this.getCarouselImg = this.getCarouselImg.bind(this);
        this.getMeta = this.getMeta.bind(this);
    }

    componentDidMount() {
        this.setState({
            section: this.props.section ? this.props.section : this.state.section,
            articleId: this.props.match.params.id,
        });

        this.getArticle(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                section: this.props.section ? this.props.section : this.state.section,
                articleId: this.props.match.params.id,
            });

            this.getArticle(this.props.match.params.id);
        }
    }

    getArticle = (id) => {
        if(this.props.isPreview){
            console.log(this.props.previewArticle);
            
            let art = this.props.previewArticle;
            console.log(art.resources);
            let res = art.resources;
            let imgDimensions = {};
            res.forEach((i) => {
                imgDimensions[i.id] = {w: 0, h: 0}
            })

            this.setState({
                article: this.processArticle(art),
                imgDimensions: imgDimensions
            }, () => {
                setInterval(this.initVedio(), 500);
            });
            window.scroll({top: 0, left: 0, behavior: 'smooth'});
        }else{
            let url = utils.protocol + utils.baseUrl + '/articles/' + id;

            fetch(url, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())
                .then(data => {
                    let res = data.resources;
                    let imgDimensions = {};
                    res.forEach((i) => {
                        imgDimensions[i.id] = {w: 0, h: 0}
                    })

                    this.setState({
                        article: this.processArticle(data),
                        imgDimensions: imgDimensions
                    }, () => {
                        setInterval(this.initVedio(), 500);
                    });
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                })
                .catch(e => console.log(e));
        }
    };

    processArticle = (art) => {
        if(art.content === null){
            return art;
        }

        let vedios = [];
        let wContent = art.content.split("</p>");
        let content = '';
    
        for(let i = 0; i < wContent.length; i++){
            let st = wContent[i];
            if(st.indexOf('YouTube') >= 0){
                let left = st.indexOf("[");
                let right = st.indexOf("]");
                let rawId = st.substring(left, right + 1);
                rawId = rawId.replace('<p>','').replace("</p>",'').replace("[",'').replace("]",'').replace(':', '').replace("YouTube", '').trim();
                let id = '';
                let read = true;

                for (let i = 0; i < rawId.length; i++){
                    if(rawId.charAt(i) === '>'){
                        read = true;
                        continue;
                    }else if(rawId.charAt(i) === '<'){
                        read = false;
                    }

                    if(read){
                        id += rawId.charAt(i);
                    }
                }

                st = "<div class='videoContainer'><div class='videoWrapper'><div id='" + id + "'></div></div></div>";
                vedios.push(id);
            }
            content += st;
        }
        this.setState({vedios: vedios})

        art.content = content;
    
        return art;
    }

    initVedio = () => {
        for(let i = 0; i < this.state.vedios.length; i++){
            let id = this.state.vedios[i];
            let player = YouTubePlayer(id, {
                videoId: id,
                width: '100%',
                height: '100%'
            });
        }
    }

    getMeta = (i) => {
        let img = new Image;
        img.src = i.content;
        img.onload = () => {
            let imgDimensions = this.state.imgDimensions;
            imgDimensions[i.id] = {
                w: img.width,
                h: img.height
            };
            this.setState({
                imgDimensions: imgDimensions
            });
        };
    }

    getCarouselImg = (i) => {
        let di = this.state.imgDimensions[i.id];
        let dif;

        if(di.h > di.w){
            return (
                <div className={this.styles.imgContainer}>
                    <img style={{height: '100%', width: 'auto'}} src={i.content}
                        alt={"p1"}/>
                </div>
            )
        }else{
            return (
                <div className={this.styles.imgContainer}>
                    <div>
                        <img src={i.content}
                            alt={"p1"}/>
                    </div>
                </div>
            )
        }
    }

    renderArticle = () => {
        if (this.state.article) {
            return (
                <div className={this.styles.contentContainer}>
                    <div className={this.styles.articleTitle}>{this.state.article.title}</div>
                    <p style={{color: utils.colorScheme.text}}>{this.state.article.creationTime}</p>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '20px',
                        alignItems: 'center'
                    }}>
                        <div className={this.styles.carouselContainer}>
                            <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showIndicators={false}>
                                {this.renderCarousel()}
                            </Carousel>
                        </div>
                    </div>
                    <div style={{width: '100%'}}>
                        <div id='contentBox' className={this.styles.contentWrapper}
                             style={!this.state.article.resources || this.state.article.resources.length === 0 ? {marginTop: 0} : {}}>
                            {parse(this.state.article.content === null ? "" : this.state.article.content)}
                        </div>
                        {this.state.article.url !== null && this.state.article.url.length > 0 ?
                            <div className={this.styles.urlWrapper}>
                                <div style={{fontWeight: 'bold', color: utils.colorScheme.secondary}}>
                                    外部链接：
                                </div>
                                <a href={this.state.article.url} target={'_blank'}
                                   style={{textDecoration: 'none', color: utils.colorScheme.text}}>
                                    {this.state.article.url}
                                </a>
                            </div> : <div/>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{position: 'relative', width: '100%', height: '300px'}}>
                    <Loading isMax={false} initialState={true} loadingMessage={'文章加载中'}/>
                </div>
            )
        }
    };

    renderCarousel = () => {
        console.log(this.state.article.resources);
        if (this.state.article.resources && this.state.article.resources.length > 0) {
            return this.state.article.resources.map((i) => {
                if(this.state.imgDimensions[i.id].w === 0 && this.state.imgDimensions[i.id].h === 0){
                    this.getMeta(i);
                }
                return (
                    <div key={i.id} className={this.styles.imgContainer}>
                        {this.getCarouselImg(i)}
                        <div className={this.styles.carouselLegend} style={{color: utils.colorScheme.tertiary}}>
                            {/*<div style={{color: utils.colorScheme.back}}>{i.title}</div>*/}
                
                                {i.description}
              
                        </div>
                    </div>
                )
            })
        } else {
            return <div/>
        }
    };

    render() {
        return (
            <div className={'contentBase'}>
                <Banner title={this.state.section.title}/>
                {this.renderArticle()}
            </div>
        );
    }

}

const styles = theme => ({
    contentContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '30px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    articleTitle: {
        fontWeight: 'bold',
        color: utils.colorScheme.secondary,
        [theme.breakpoints.down('sm')]: {
            fontSize: '25px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '35px',
        },
    },
    carouselContainer: {
        [theme.breakpoints.down('xs')]: {
            width: '87vw',
        },
        [theme.breakpoints.up('sm')]: {
            width: '55vw',
        },
    },
    imgContainer: {
        [theme.breakpoints.down('xs')]: {
            width: '87vw',
            height: 'calc(87vw/16*9)'
        },
        [theme.breakpoints.up('sm')]: {
            width: '55vw',
            height: 'calc(55vw/16*9)'
        },
    },
    contentWrapper: {
        marginTop: '35px',
        color: utils.colorScheme.text,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '20px',
        },
    },
    urlWrapper: {
        marginTop: '35px',
        color: utils.colorScheme.text,
        fontStyle: 'italic',
        display: 'flex',
        flexDirection: 'column',
    },
    carouselLegend: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: '5px',
        paddingBottom: '5px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '17px'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '21.5px'
        }
    }
});

Article.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired,
    previewArticle: PropTypes.object,
    isPreview: PropTypes.bool
};

export default withRouter(withStyles(styles)(Article));
