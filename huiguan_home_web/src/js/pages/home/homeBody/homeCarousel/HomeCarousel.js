import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import {Carousel} from "react-responsive-carousel";
import utils from "../../../../common/util";
import Loading from "../../../../component/loading/Loading";


class HomeCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            homeCarousel: [],
            imgDimensions: {}
        };

        this.styles = this.props.classes;

        this.getHomeCarousel = this.getHomeCarousel.bind(this);
        this.renderHomeCarousel = this.renderHomeCarousel.bind(this);
        this.getMeta = this.getMeta.bind(this);
        this.getCarouselImg = this.getCarouselImg.bind(this);

        this.loading = React.createRef();
    }

    componentDidMount() {
        this.getHomeCarousel();
    }

    getHomeCarousel = () => {
        let url = utils.protocol + utils.baseUrl + '/short/latest/4/12';
        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                hasResource: true
            })
        })
            .then(response => response.json())
            .then(data => {
                let cs = [];
                let imgDimensions = {};
                for(let i = 0; i < data.articleList.length; i++){
                    let a = data.articleList[i];
                    if (a.resource !== null && a.resource !== '') {
                        let res = a.resource;
                        res.sectionNav = (utils.getSection(a.sectionId)).navigation;
                        cs.push(res);
                        imgDimensions[res.id] = {w: 0, h: 0}
                    }
                }
                this.setState({homeCarousel: cs, imgDimensions: imgDimensions});
            })
            .catch(e => {
                console.log(e);
            });
    };

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

        // if(di.h > di.w){
        //     return (
        //         <div className={this.styles.imgContainer}>
        //             <img style={{height: '100%', width: 'auto'}} src={i.url !== null ? i.url : i.content}
        //                 alt={"p1"}/>
        //         </div>
        //     )
        // }else{
        //     return (
        //         <div className={this.styles.imgContainer}>
        //             <div>
        //                 <img src={i.url !== null ? i.url : i.content}
        //                     alt={"p1"}/>
        //             </div>
        //         </div>
        //     )
        // }

        return (
                <div className={this.styles.imgContainer}>
                    <img style={{height: '100%', width: 'auto'}} src={i.url !== null ? i.url : i.content}
                        alt={"p1"}/>
                </div>
        )
    }

    renderHomeCarousel = () => {
        return this.state.homeCarousel.map((i) => {
            if(this.state.imgDimensions[i.id].w === 0 && this.state.imgDimensions[i.id].h === 0){
                this.getMeta(i);
            }
            return (
                <Link key={i.id} target={'_blank'} to={'/b/article' + i.sectionNav + "/" + i.articleId}>
                    <div>
                        {this.getCarouselImg(i)}
                        <div className={this.styles.homeCarouselLegend}>
                            {/*<p className={this.styles.homeCarouselLegendText}>{i.title}</p>*/}
                            <p className={this.styles.homeCarouselLegendDes}>{i.description}</p>
                        </div>
                    </div>
                </Link>
            )
        })
    };

    render() {
        return (
            <div>
                {this.state.homeCarousel.length !== 0 ?
                    <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
                        {this.renderHomeCarousel()}
                    </Carousel> : <div/>
                }
            </div>
        );
    }

}

const styles = theme => ({
    bodyContainer: {
        height: '300px',
        position: 'relative'
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
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '17.5px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '40px',
        }
    },
    imgContainer: {
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: '55vw',
        },
        [theme.breakpoints.up('md')]: {
            height: '40vw',
        }
    }
});

HomeCarousel.propTypes = {};

export default withStyles(styles)(HomeCarousel);
