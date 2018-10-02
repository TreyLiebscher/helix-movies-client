import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import { mockUserData, mockUserData2 } from '../../lib/helixDataLoader';
import requiresLogin from '../requires-login';
import {getProfile} from '../../actions/users'
import formatCurrency from 'format-currency';
import './ProfilePage.css'



export class ProfilePageWithData extends React.Component {
    componentDidMount() {
        this.props.dispatch(getProfile())
    }


    render () {

       
        return (
            <div>
                <div>{this.props.profile.email}</div>
                <ul>{this.props.profile.genres}</ul>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        profile: state.userProfile
    };
};





export default requiresLogin()(connect(mapStateToProps)(ProfilePageWithData));