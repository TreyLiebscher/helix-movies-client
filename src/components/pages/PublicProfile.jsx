import React, { Component } from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer';
import { getPublicProfile } from '../../lib/tmdbLoader';
import slugify from 'slugify';

export default function PublicProfile(props) {
    const { userInfo } = props;

    console.log(userInfo.user.username)

    

    const movieArray = userInfo.user.movies;

    const movieCount = movieArray.length;

    const titles = movieArray.map((item, index) => {
        return <li key={index}>{item.title}</li>
    })
// TODO need release dates to be serialized in model
// Also TODO need to pluralize 'genres' in movie model for consistency
    const genres = movieArray.map((item) => item.genre);
    console.log('kiwi genres returns', genres);
    const genreArray = [].concat.apply([], genres);
    console.log('kiwi genreArray returns', genreArray);

    const budgets = movieArray.map((item) => item.budget);
    console.log('kiwi budgets returns', genres);
    const budgetArray = [].concat.apply([], budgets);
    console.log('kiwi budgetArray returns', budgetArray);

    const ratings = movieArray.map((item) => item.rating);
    const ratingArray = [].concat.apply([], ratings);

    const runtimes = movieArray.map((item) => item.runtime);
    const runtimeArray = [].concat.apply([], runtimes);

    const getFrequency = function (arr) {
        let obj = {}, mostFreq = 0, which = [];
  
        arr.forEach(ea => {
          if (!obj[ea]) {
            obj[ea] = 1;
          } else {
            obj[ea]++;
          }
      
          if (obj[ea] > mostFreq) {
            mostFreq = obj[ea];
            which = [ea];
          } else if (obj[ea] === mostFreq) {
            which.push(ea);
          }
        });
      
        return which.map((item, index) => {
            return <li key={index}>{item}</li>
        });
    }

    const getAverage = function (arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        const average = total / arr.length
        return Math.floor(average);
    }

    return (
        <div>
            <div>This profile belongs to {userInfo.user.username}</div>
            <div>They have rated {movieCount} movies</div>
            <ul>
                {titles}
            </ul>
            <div>Top Genres</div>
            <ul>{getFrequency(genreArray)}</ul>
            <div>Average Budget</div>
            <p>${getAverage(budgetArray)}</p>
            <div>Average Rating</div>
            <p>{getAverage(ratingArray)}%</p>
            <div>Average Runtime</div>
            <p>{getAverage(runtimeArray)} minutes</p>
        </div>
    )
}

PublicProfile.propTypes = {
    userInfo: propTypes.object.isRequired
}

const promise = props => {
    const username = props.match.params.username;
    return getPublicProfile(username);
}

const renderFn = (props) => {
    const username = props.match.params.username;
    const userInfo = props.resolvedValue;
    const p = { username, userInfo, history: props.history }
    return <PublicProfile {...p} />
}

const connectedProps = { promise, renderFn };

export const PublicProfileWithData = () => <PromiseContainerWithRouter {...connectedProps} />

