import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Gallery.css';
import SectionDivider from "../../../../component/sectionDivider/SectionDivider";
import utils from "../../../../common/util";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryItems: []
        };

        this.styles = this.props.classes;

        this.getGallery = this.getGallery.bind(this);
        this.renderGallery = this.renderGallery.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({
            galleryItems: this.getGallery()
        })
    }

    getGallery = () => {
        let imagesOrg = utils.gallery;
        let images = [];
        for (let i = 0; i < imagesOrg.length; i++) {
            if (i % 4 === 0) {
                images.push([]);
            }
            images[Math.floor(i / 4)].push(imagesOrg[i]);
        }
        return images;
    };

    renderGallery = () => {
        let view = [];
        this.state.galleryItems.forEach((images) => {
            let view_t = (
                <div style={{display: 'flex', marginTop: '15px'}} className={this.styles.galleryContainer}>
                    {images.map(i => {
                        return (
                            <div key={i.id} className={this.styles.imgWrapper}>
                                <img className={'imgItem'} alt={i.title} src={i.src}/>
                                <div className={'igmItemCover'}>
                                    <div className={'imgTitle'}>{i.title}</div>
                                    <div className={'imgDes'}>{i.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            );
            view.push(view_t);
        });
        return view;
    };

    render() {
        return (
            <div className={'base'}>
                <SectionDivider title={"Gallery"} showDivider={true}
                                short={'We connect consumers, businesses, banks and governments in more than 200 countries and territories worldwide.'}/>

                <div>
                    {this.renderGallery()}
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    galleryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    imgWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 10px 10px 10px',
        backgroundColor: '#09d3ac',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: '2.5px 2.5px 2.5px 2.5px',
        border: 'solid lightslategray',
        [theme.breakpoints.down('xs')]: {
            width: '70vw',
            height: '70vw'
        },
        [theme.breakpoints.up('sm')]: {
            width: '15vw',
            height: '15vw'
        }
    }
});

Gallery.propTypes = {};

export default withStyles(styles)(Gallery);
