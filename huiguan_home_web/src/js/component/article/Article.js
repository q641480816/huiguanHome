import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route, withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Article.css';
import utils from "../../common/util";
import Banner from "../banner/Banner";
import {Carousel} from "react-responsive-carousel";
import parse from "html-react-parser";

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleId: 0,
            article: null,
            section: {title: '', navigation: '', isRenderList: true},
        };

        this.styles = this.props.classes;

        this.getArticle = this.getArticle.bind(this);
        this.renderArticle = this.renderArticle.bind(this);
        this.renderCarousel = this.renderCarousel.bind(this);
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
        let url = utils.protocol + utils.baseUrl + '/articles/' + id;

        fetch(url, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    article: data
                });
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
            })
            .catch(e => console.log(e));
    };

    renderArticle = () => {
        if (this.state.article) {
            return (
                <div className={this.styles.contentContainer}>
                    <p className={this.styles.articleTitle}>{this.state.article.title}</p>
                    <p style={{color: utils.colorScheme.text}}>{this.state.article.time ? this.state.article.time : this.state.article.creation_time}</p>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                        <div className={this.styles.carouselContainer}>
                            <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} centerMode={true}
                                      showIndicators={false}>
                                {this.renderCarousel()}
                            </Carousel>
                        </div>
                    </div>
                    <div className={this.styles.contentWrapper}
                         style={!this.state.article.resources || this.state.article.resources.length === 0 ? {marginTop: 0} : {}}>
                        {parse(this.state.article.content)}
                    </div>
                </div>
            );
        }
    };

    renderCarousel = () => {
        if (this.state.article.resources && this.state.article.resources.length > 0) {
            return this.state.article.resources.map((i) => {
                return (
                    <div key={i.id}>
                        <img src={i.url ? i.url : i.content} alt={"p1"}/>
                        <div className={this.styles.carouselLegend}>
                            <div style={{color: utils.colorScheme.back}}>{i.title}</div>
                            <div style={{color: utils.colorScheme.tertiary}}>{i.description}</div>
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
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '80%',
        },
    },
    articleTitle: {
        fontWeight: 'bold',
        color: utils.colorScheme.secondary,
        fontSize: '35px'
    },
    carouselContainer: {
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        [theme.breakpoints.up('md')]: {
            width: '65%',
        },
    },
    contentWrapper: {
        marginTop: '20px',
        color: utils.colorScheme.text,
        fontSize: '18px'
    },
    carouselLegend: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            height: '40%',
            fontSize: '15px'
        },
        [theme.breakpoints.up('sm')]: {
            height: '30%',
            fontSize: '20px'
        },
        [theme.breakpoints.up('md')]: {
            height: '30%',
            fontSize: '26.5px'
        }
    }
});

Article.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Article));
