import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Route} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import SectionDivider from "../../component/sectionDivider/SectionDivider";
import utils from "../../common/util";

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.styles = this.props.classes;
    }

    render() {
        return (
            <div id='container' style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <div className={this.styles.title} style={{marginTop: '15px', marginBottom: '25px', color: utils.colorScheme.secondary}}>寻找并联系我们</div>
                <iframe width="700" height="520" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                        src="http://maps.google.com.sg/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=29+Bukit+Pasoh+Road+%2304-01+Singapore+089843&amp;sll=1.359,103.818&amp;sspn=0.357641,0.676346&amp;ie=UTF8&amp;hq=&amp;hnear=29+Bukit+Pasoh+Rd,+089843&amp;ll=1.279203,103.84044&amp;spn=0.005588,0.010568&amp;t=m&amp;z=14&amp;output=embed"></iframe>
            </div>
        );
    }

}

const styles = theme => ({
    title: {
        textTransform: 'uppercase',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: '27.5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '37.5px',
        }
    },
});

ContactUs.propTypes = {};

export default withStyles(styles)(ContactUs);
