import React from 'react';
import { connect } from 'react-redux';
import './Loading.css';

export class LoadingIcon extends React.Component {
    displayLoadingIcon(){
        return this.props.loading ? <div className="loadingIcon"><p>Loading...</p></div> : null;
    }

    render(){
        return (
            <div>{this.displayLoadingIcon()}</div>
        );
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps)(LoadingIcon);