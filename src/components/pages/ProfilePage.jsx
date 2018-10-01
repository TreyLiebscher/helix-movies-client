import React from 'react';
import propTypes from 'prop-types';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import { mockUserData, mockUserData2 } from '../../lib/helixDataLoader';
import formatCurrency from 'format-currency';
import './ProfilePage.css'

export default function ProfilePage(props) {
    
    const getFrequency = function (arr) {
        return arr.sort((a, b) => 
            arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
    ).pop();
    }

    const getAverage = function (arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        const average = total / arr.length;
        return average;
    }



    const decades = mockUserData.helix.decades;
    const mostFrequentYear = getFrequency(decades);
    const userDecade = mostFrequentYear.slice(0, -1) + `0's`;

    const genres = mockUserData.helix.genres;
    const userGenre = getFrequency(genres);
    
    const budgets = mockUserData.helix.budget;
    const userBudget = formatCurrency(Math.floor(getAverage(budgets)));

    const runtimes = mockUserData.helix.runtime;
    const userRuntimes = Math.floor(getAverage(runtimes));

    const revenues = mockUserData.helix.revenue;
    const userRevenues = formatCurrency(Math.floor(getAverage(revenues)));

    const ratings = mockUserData.helix.rating;
    const userRating = Math.floor(getAverage(ratings));


    


    
    return (
        <div className="profile-main">
            <div>Your profile</div>
            <p>{mockUserData.userName}</p>
            <p>
               You tend to prefer {userGenre} movies from the <span className="profile-helix-words">{userDecade} </span>
                with average budgets of {userBudget}, average runtimes of {userRuntimes} minutes,
                average revenues of {userRevenues}, and an average rating of {userRating}%
            </p>
            <table>
                <thead>
                    <tr>
                        <th colspan="2">Your Preferences</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Decade</td>
                        <td>Genre</td>
                        <td>Runtime</td>
                        <td>Rating</td>
                        <td>Budget</td>
                        <td>Revenue</td>
                    </tr>
                    <tr>
                        <td>{userDecade}</td>
                        <td>{userGenre}</td>
                        <td>{userRuntimes} mins</td>
                        <td>{userRating}%</td>
                        <td>${userBudget}</td>
                        <td>${userRevenues}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
ProfilePage.propTypes = {
    userData: propTypes.object.isRequired
}

// const renderFn = (props) => {
//     const p ={ history: props.history };
//     return <ProfilePage {...p} />
// }

// export const ProfilePageWithData = () => <PromiseContainerWithRouter {...renderFn} />

export const ProfilePageWithData = () => {return <ProfilePage />}