import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from '../config';
import { saveMovie } from '../actions/users';
import './SaveButton.css'

export function SaveButton(props) {
    const {movie, user} = props;

    function saveMovie2(e) {
        e && e.preventDefault()
        return props.dispatch(saveMovie(props.movie))
    }

    function checkStatus() {
        const userMovies = props.user.movies.map((movie) => movie.title);
        
        const found = (userMovies.indexOf(props.movie.title) > -1);
        
        const notSavedButton = <button className="save-button" onClick={saveMovie2}>Save to Favorites</button>;
        const savedButton = <button className="save-button" style={{backgroundColor: '#043a33'}}>Already Saved</button>;
        return found ? savedButton : notSavedButton
    }

    return (
        <div className="save-button-holder">
            {checkStatus()}
        </div>
    )
    
}

const mapStateToProps = state => ({
    user: state.userProfile
})

export default connect(mapStateToProps)(SaveButton);