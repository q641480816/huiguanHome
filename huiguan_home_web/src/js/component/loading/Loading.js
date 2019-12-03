import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {BounceLoader} from "react-spinners";
import utils from "../../common/util";


class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMax: false,
            loadingMessage: '',
            show: false
        };

        this.styles = this.props.classes;

        this.toggleLoading = this.toggleLoading.bind(this);
    }

    componentDidMount() {
        this.setState({
            isMax: this.props.isMax ? this.props.isMax : this.state.isMax,
            loadingMessage: this.props.loadingMessage ? this.props.loadingMessage : '',
            show: this.props.initialState ? this.props.initialState : false
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.loadingMessage !== this.props.loadingMessage){
            this.setState({
                loadingMessage: this.props.loadingMessage
            })
        }
    }

    toggleLoading = (show) => {
        this.setState({
            show: show
        });
    };

    render() {
        if(this.state.show) {
            return (
                <div className={this.state.isMax ? this.styles.maxContainer : this.styles.container}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <BounceLoader
                            color={this.state.isMax ? utils.colorScheme.tertiary : utils.colorScheme.secondary}
                            loading={true} size={100}/>
                        <div style={{
                            marginLeft: '17.5px',
                            color: this.state.isMax ? utils.colorScheme.tertiary : utils.colorScheme.secondary,
                            fontSize: '22.5px',
                            fontWeight: 'bold'
                        }}>{this.state.loadingMessage}</div>
                    </div>
                </div>
            );
        }else{
            return <div/>
        }
    }

}

const styles = theme => ({
    maxContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10000
    },
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10000
    }
});

Loading.propTypes = {
    isMax: PropTypes.bool.isRequired,
    loadingMessage: PropTypes.string,
    initialState: PropTypes.bool,
    show: PropTypes.bool
};

export default withStyles(styles)(Loading);
