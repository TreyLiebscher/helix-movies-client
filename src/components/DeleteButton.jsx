import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { deleteMovie } from '../actions/users';
import './SaveButton.css'

export function DeleteButton(props) {


    function deleteMovieClick(e) {
        e && e.preventDefault()
        const title = props.title;
        return props.dispatch(deleteMovie(title))
    }


    return (
        
            <button className="movieButton" onClick={deleteMovieClick}>Delete Movie</button>
        
    )

}

const mapStateToProps = state => ({
    user: state.userProfile
})

export default connect(mapStateToProps)(DeleteButton);