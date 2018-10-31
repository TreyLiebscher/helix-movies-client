import React from 'react';
import formatCurrency from 'format-currency';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

export class MatchTable extends React.Component {

    closestMatch(num, arr) {
        let current = arr[0];
        let diff = Math.abs(num - current);
        for (let val = 0; val < arr.length; val++) {
            let newdiff = Math.abs(num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                current = arr[val];
            }
        }
        return current;
    }

    // Exact Match (strings)
    exactMatch(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].match(val)) return arr[i]
        }
        return -1;
    }

    styleCloseMatches(org, match, matchArray, symbol) {
        const closest = this.closestMatch(org, matchArray);
        console.log(closest)
        if (match === closest) {
            return <td className="matchedField matchTD">{match}{symbol}</td>
        } else {
            return <td className="non-matchedField matchTD">{match}{symbol}</td>
        }
    }

    styleExactMatches(org, match, matchArray) {

        const orgArray = org.map((item) => item.name);

        const matchItems = match.map((item, index) => {
            const matcher = this.exactMatch(orgArray, item.name);
            if (matcher !== -1) {
                return <li className="genre matchedField" key={index}>{item.name}</li>
            } else {
                return <li key={index} className="genre">{item.name}</li>
            }
        })

        return <td className="non-matchedField matchTD"><ul style={{listStyle: 'none', padding: '0', margin: '0'}}>{matchItems}</ul></td>
    }


    render() {
        const matchArray = this.props.match;
        const orgMovie = this.props.movie;

        const matchYears = matchArray.map((match) => match.release_date.substring(0, 4));
        const orgYear = orgMovie.release_date.substring(0, 4);

        const matchRatings = matchArray.map((match) => match.vote_average * 10);
        const matchRuntimes = matchArray.map((match) => match.runtime);
        const matchBudgets = matchArray.map((match) => formatCurrency(match.budget));
        const matchRevenues = matchArray.map((match) => formatCurrency(match.revenue));




        const matchedMovies = this.props.match.map((item, index) => {

            const img = item.hasPoster ? (<Link className="movie-link" to={`/analyze/${item.id}/${slugify(item.title)}`}
            ><img src={item.poster} className="match-poster" alt="a movie poster"></img></Link>) : null;

            return <tr key={index} className="matchTR">
                <td className="non-matchedField matchTitle matchTD"><Link className="movie-link" to={`/analyze/${item.id}/${slugify(item.title)}`}
                >
                    {item.title}
                </Link></td>
                <td className="non-matchedField matchTD">{img}</td>
                {this.styleCloseMatches(orgYear, item.release_date.substring(0, 4), matchYears)}
                {this.styleExactMatches(orgMovie.genres, item.genres)}
                {this.styleCloseMatches(orgMovie.vote_average * 10, item.vote_average * 10, matchRatings, '%')}
                {this.styleCloseMatches(orgMovie.runtime, item.runtime, matchRuntimes, ' mins')}
                {this.styleCloseMatches(formatCurrency(orgMovie.budget), formatCurrency(item.budget), matchBudgets)}
                {this.styleCloseMatches(formatCurrency(orgMovie.revenue), formatCurrency(item.revenue), matchRevenues)}
                {this.styleExactMatches(orgMovie.production_companies, item.production_companies)}
                {this.styleExactMatches(orgMovie.production_countries, item.production_countries)}
            </tr>
        })


        return (
            <tbody className="matchTB">
                {matchedMovies}
            </tbody>
        )

    }
}