import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {withStyles} from "@material-ui/core";
import {Carousel} from 'react-responsive-carousel';

import SectionDivider from "../../../component/sectionDivider/SectionDivider";

import utils from "../../../common/util";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HomeBody.css';
import Gallery from "./gallery/Gallery";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeFeed from "./homeFeed/HomeFeed";
import HistoryCarousel from "./historyCarousel/HistoryCarousel";

class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeCarousel: []
        };

        this.styles = this.props.classes;
    }

    componentDidMount() {

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <HomeCarousel/>
                </div>
                <div>
                    <div style={{marginTop: '50px'}}/>
                    <HomeFeed/>
                </div>
                <div style={{marginTop: '30px'}}>
                    <SectionDivider title={"情缘晋江"} showDivider={true} textColor={utils.colorScheme.secondary}
                                    color={utils.colorScheme.secondary} short={''}/>
                </div>
                <div>
                    <div style={{marginTop: '30px'}}/>
                    <Gallery/>
                </div>
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
