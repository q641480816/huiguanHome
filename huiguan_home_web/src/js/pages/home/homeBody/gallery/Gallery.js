import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {Button, withStyles} from "@material-ui/core";

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
        let index = 0;
        let index_img = 0;
        this.state.galleryItems.forEach((images) => {
            let view_t = (
                <div key={index} style={{display: 'flex', marginTop: '15px'}} className={this.styles.galleryContainer}>
                    {images.map(i => {
                        let img_view = (
                            <div key={i.id} className={index_img >= 2 ? this.styles.imgWrapperMobile : this.styles.imgWrapper}>
                                <img className={'imgItem'} alt={i.title} src={i.src}/>
                                <div className={'igmItemCover'}>
                                    <div className={'imgTitle'}>{i.title}</div>
                                    <div className={'imgDes'}>{i.description}</div>
                                </div>
                            </div>
                        )
                        index_img ++;
                        return img_view;
                    })}
                </div>
            );
            index++;
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

                <Button onClick={()=>{console.log("read more")}} variant="outlined" color="inherit"
                        style={{display: 'flex', flexDirection: 'row', marginTop: '15px'}}>
                    <div>Read more</div>
                </Button>
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
    },
    imgWrapperMobile: {
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
            height: '70vw',
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            width: '15vw',
            height: '15vw',
            display: 'flex',
        }
    }
});

Gallery.propTypes = {};

export default withStyles(styles)(Gallery);
