import React from 'react';
import './AboutPage.css'
export default function AboutPage() {
    return (
        <div className="about-main">
            <p>Can't decide what to watch? Find the perfect movie with Movie Helix!</p>
            <div className="about-flexbox">
                <div className="about-item">
                    <p>Search for movies you already like</p>
                    <img src="https://i.imgur.com/RCGb8lf.png" title="source: imgur.com" className="about-image"/>
                </div>
                <div className="about-item">
                    <p>See a detailed comparison to similar movies</p>
                    <img src="https://i.imgur.com/GthnBfL.png" title="source: imgur.com" className="about-image"/>
                </div>
                <div className="about-item">
                    <p>Save movies to your profile</p>
                    <div className="about-button">
                        <button className="mockButton" tabIndex="-1">Save To Favorites</button>
                    </div>
                </div>
                <div className="about-item">
                    <p>After you've saved some movies, perform a search based off of YOUR favorite movies!</p>
                    <img src="https://i.imgur.com/Z72aVQy.png" title="source: imgur.com" className="about-image"/>
                </div>
            </div>
        </div>
    )
}