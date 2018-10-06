// import React from 'react';
// import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
// import {API_BASE_URL} from '../config';

// export class SaveButton extends React.Component {
//     renderResults() {
//         return <div></div>
//     }

//     saveMovie() {
//         return
//             fetch('https://mywebsite.com/endpoint/', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     user: 'yourValue',
//                     title: 'yourValue',
//                     year: 'yourValue',
//                     genre: 'yourOtherValue',
//                     rating: 'yourOtherValue',
//                     runtime: 'yourOtherValue',
//                     budget: 'yourOtherValue',
//                     revenue: 'yourOtherValue',
//                     production_companies: '',
//                     production_countries: '',
//                 })
//             })
        
//     }

//     render() {
//             return 
//             <div className="save-button-holder">
//                 <button className="save-button" onClick={this.saveMovie()}>Save to Favorites</button>
//             </div>
//     }
// }

// // const mapStateToProps = state => ({
// //     loggedIn: state.auth.currentUser !== null,
// // })

// // export default connect(mapStateToProps)(SaveButton);