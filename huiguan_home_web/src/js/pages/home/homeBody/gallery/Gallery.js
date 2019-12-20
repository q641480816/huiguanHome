import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/core";

import './Gallery.css';
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
        this.getGallery();
    }

    getGallery = () => {
        let url = utils.protocol + utils.baseUrl + '/short/latest/13/15';

        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                hasResource: true
            })
        })
            .then(response => response.json())
            .then(data => {
                let imagesOrg = [];
                data.articleList.forEach(a => {
                    if (a.resource !== null && a.resource !== '') {
                        let res = a.resource;
                        res.sectionNav = (utils.getSection(a.sectionId)).navigation;
                        res.artTitle = a.title;
                        imagesOrg.push(res);
                    }
                });
                let images = [];
                for (let i = 0; i < imagesOrg.length; i++) {
                    if (i % 3 === 0) {
                        images.push([]);
                    }
                    images[Math.floor(i / 3)].push(imagesOrg[i]);
                    if (i === 5) break;
                }
                this.setState({galleryItems: images});
            })
            .catch(e => {
                console.log(e);
            });
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
                            <Link key={i.id} to={'/b/topics' + i.sectionNav}>
                                <div key={i.id}
                                     className={index_img >= 2 ? this.styles.imgWrapperMobile : this.styles.imgWrapper}>
                                    <img className={'imgItem'} alt={i.title} src={i.content}/>
                                    <div className={'igmItemCover'}>
                                        <div className={'imgTitle'}>{i.artTitle}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                        index_img++;
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
                <div>
                    {this.renderGallery()}
                </div>

                {/*<Button onClick={()=>{console.log("read more")}} variant="outlined" color="inherit"*/}
                {/*        style={{display: 'flex', flexDirection: 'row', marginTop: '15px'}}>*/}
                {/*    <div>Read more</div>*/}
                {/*</Button>*/}
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
        margin: '15px 15px 15px 15px',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: '2.5px 2.5px 2.5px 2.5px',
        border: 'solid lightslategray',
        [theme.breakpoints.down('xs')]: {
            width: '70vw',
            height: 'calc(70vw/16*9)'
        },
        [theme.breakpoints.up('sm')]: {
            width: '23vw',
            height: 'calc(23vw/16*9)'
        }
    },
    imgWrapperMobile: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        margin: '15px 15px 15px 15px',
        backgroundColor: '#09d3ac',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: '2.5px 2.5px 2.5px 2.5px',
        border: 'solid lightslategray',
        [theme.breakpoints.down('xs')]: {
            width: '70vw',
            height: 'calc(70vw/16*9)'
        },
        [theme.breakpoints.up('sm')]: {
            width: '23vw',
            height: 'calc(23vw/16*9)'
        }
    }
});

Gallery.propTypes = {};

export default withStyles(styles)(Gallery);
