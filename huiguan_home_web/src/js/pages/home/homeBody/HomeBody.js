import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {withStyles} from "@material-ui/core";
import {Carousel} from 'react-responsive-carousel';

import SectionDivider from "../../../component/sectionDivider/SectionDivider";

import utils from "../../../common/util";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HomeBody.css';
import Gallery from "./gallery/Gallery";

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeCarousel: []
        };

        this.styles = this.props.classes;

        this.getHomeCarousel = this.getHomeCarousel.bind(this);
        this.renderHomeCarousel = this.renderHomeCarousel.bind(this);
    }

    componentDidMount() {
        let homeCarousel = this.getHomeCarousel();

        this.setState({
            homeCarousel: homeCarousel
        })
    }

    getHomeCarousel = () => {
        return utils.homeCarousel;
    };

    renderHomeCarousel = () => {
        return this.state.homeCarousel.map((i) => {
            return (
                <div key={i.id}>
                    <img src={i.src} alt={"p1"}/>
                    <p className={this.styles.homeCarouselLegend}>{i.legend}</p>
                </div>
            )
        })
    };

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
                    {this.renderHomeCarousel()}
                </Carousel>
                <div>
                    <SectionDivider title={"News/Events"} showDivider={false}
                                    short={'We connect consumers, businesses, banks and governments in more than 200 countries and territories worldwide.'}/>
                </div>
                <div>
                    <SectionDivider title={"Announcements"} showDivider={true}
                                    short={'We connect consumers, businesses, banks and governments in more than 200 countries and territories worldwide.'}/>
                </div>
                <Gallery/>
            </div>
        );
    }

}

const styles = theme => ({
    homeCarouselLegend: {
        position: 'absolute',
        top: '0',
        left: '40px',
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
    }
});

HomeBody.propTypes = {};

export default withStyles(styles)(HomeBody);
