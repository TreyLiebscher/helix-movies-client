import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from '../config';
import './SaveButton.css'

export default function DeleteButton(props) {
    const {title, user, dispatch} = props;

    function deleteMovie (e) {
        e.preventDefault();
        console.log('kiwi deleting movie...')
        
        const title = props.title;
        const user = props.user;
        
        return fetch(`${API_BASE_URL}/movies/delete`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    title: title,
                })
            })
            .then(res => res.json())
        
    }

    
    return (
        <div className="save-button-holder">
            <button className="delete-button" onClick={deleteMovie}>Delete Movie</button>
        </div>
    )
    
}