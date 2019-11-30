import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import {Carousel} from "react-responsive-carousel";
import utils from "../../../../common/util";


class HistoryCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            homeCarousel: []
        };

        this.styles = this.props.classes;

        this.getHomeCarousel = this.getHomeCarousel.bind(this);
        this.renderHomeCarousel = this.renderHomeCarousel.bind(this);

        this.loading = React.createRef();
    }

    componentDidMount() {
        this.getHomeCarousel();
    }

    getHomeCarousel = () => {
        let url = utils.protocol + utils.baseUrl + '/short/latest/13/15';
        fetch(url, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                let cs = [];
                data.articleList.forEach(a => {
                    if (a.resource !== null && a.resource !== '') {
                        let res = a.resource;
                        res.sectionNav = (utils.getSection(a.sectionId)).navigation;
                        cs.push(res);
                    }
                });
                this.setState({homeCarousel: cs});
            })
            .catch(e => {
                console.log(e);
            });
    };

    renderHomeCarousel = () => {
        return this.state.homeCarousel.map((i) => {
            return (
                <Link key={i.id} target={'_blank'} to={'/b/article' + i.sectionNav + "/" + i.articleId}>
                    <div>
                        <div className={this.styles.imgContainer}>
                            <img src={i.url !== null ? i.url : i.content}
                                 alt={"p1"}/>
                        </div>
                        <div className={this.styles.homeCarouselLegend}>
                            <p className={this.styles.homeCarouselLegendText}>{i.title}</p>
                            <p className={this.styles.homeCarouselLegendDes}>{i.description}</p>
                        </div>
                    </div>
                </Link>
            )
        })
    };

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div className={this.styles.bodyContainer}>
                    {this.state.homeCarousel.length !== 0 ?
                        <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
                            {this.renderHomeCarousel()}
                        </Carousel> : <div/>
                    }
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '80%'
        }
    },
    homeCarouselLegend: {
        position: 'absolute',
        top: '0',
        left: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    homeCarouselLegendText: {
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '100',
        [theme.breakpoints.down('sm')]: {
            fontSize: '17.5px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '40px',
        }
    },
    homeCarouselLegendDes: {
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '100',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '30px',
        }
    },
    imgContainer: {
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            height: '55vw',
        },
        [theme.breakpoints.up('sm')]: {
            height: '40vw',
        }
    }
});

HistoryCarousel.propTypes = {};

export default withStyles(styles)(HistoryCarousel);
