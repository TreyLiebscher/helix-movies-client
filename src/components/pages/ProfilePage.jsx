import React from 'react';
import propTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import { mockUserData, mockUserData2 } from '../../lib/helixDataLoader';
import RandomColor from 'randomcolor';
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

    // let total = [];
    // const decades2 = mockUserData2.helix.decades.map((item, index) => {
    //     total.push(item.length);
    // })
    // const test = mockUserData2.helix.decades.map((item) => {
    //     console.log(item.length)
    // });
    // const test = mockUserData2.helix.decades.map((item) => {
    //     console.log(item.length)
    // });
    // console.log('kiwi total returns', test)
    let total = [];
    const decades2 = mockUserData2.helix.decades;
    const values = Object.entries(decades2).forEach(
        ([key, value]) => {
            // total.push(value.length)
            total.push({title: key, value: value.length, color: RandomColor()})
        }
    )

    const sumTotalDecades = total.reduce((a, b) => a + b, 0);

    console.log(total)


    const decades = mockUserData.helix.decades;
    const mostFrequentYear = getFrequency(decades);
    const userDecade = mostFrequentYear.slice(0, -1) + `0's`;

    const genres = mockUserData.helix.genres;
    const userGenre = getFrequency(genres);
    
    const budgets = mockUserData.helix.budget;
    const userBudget = getAverage(budgets);

    const runtimes = mockUserData.helix.runtime;
    const userRuntimes = Math.floor(getAverage(runtimes));

    const revenues = mockUserData.helix.revenue;
    const userRevenues = Math.floor(getAverage(revenues));

    const ratings = mockUserData.helix.rating;
    const userRating = Math.floor(getAverage(ratings));

    const data = [
        {title: "Data 1", value: 100, color: "#22594e"},
        {title: "Data 2", value: 60, color: "#2f7d6d"},
        {title: "Data 3", value: 30, color: "#3da18d"},
        {title: "Data 4", value: 20, color: "#69c2b0"},
        {title: "Data 5", value: 10, color: "#a1d9ce"},
      ]

    


    
    return (
        <div className="profile-main">
            <div>Your profile</div>
            <p>{mockUserData.userName}</p>
            <p>
               You tend to prefer {userGenre} movies from the <span className="profile-helix-words">{userDecade} </span>
                with average budgets of {userBudget}, average runtimes of {userRuntimes} minutes,
                average revenues of {userRevenues}, and an average rating of {userRating}%
            </p>
            <div className="profile-chart-container">
            <PieChart data={total} radius={30} className="profile-chart" />
            <PieChart data={data} radius={30} className="profile-chart"/>
            <PieChart data={data} radius={30} className="profile-chart"/>
            </div>
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