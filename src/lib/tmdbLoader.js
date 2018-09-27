import { search } from "../components/tmdbSearch";

const cacheByUrl = {}

// searchByTitle + getSimilar
const normalizeMovie = movie => ({
    title: movie.title,
    id: movie.id,
    hasPoster: !!movie.poster_path,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
});

//  searchById
const normalizeDetailMovie = movie => ({
    title: movie.title,
    id: movie.id,
    hasPoster: !!movie.poster_path,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    budget: movie.budget,
    genres: movie.genres,
    homepage: movie.homepage,
    overview: movie.overview,
    popularity: movie.popularity,
    production_companies: movie.production_companies,
    production_countries: movie.production_countries,
    release_date: movie.release_date,
    revenue: movie.revenue,
    runtime: movie.runtime,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count
});

function cachedFetch(url) {
    if (cacheByUrl[url]) {
        return Promise.resolve(cacheByUrl[url])
    }
    //cache results in browser memory
    return fetch(url)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(res => { cacheByUrl[url] = res; return res });
}

// Find Movie by Title (1)
export function searchByTitle(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1&include_adult=false&query=${title}`
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie))
}

// Find Movie by ID (2, 4)
export function searchById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`
    return cachedFetch(url)
        .then(normalizeDetailMovie)
}

// Find similar movies from initial movie ID (3)
// export function getSimilar(id) {
//     return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`).then(res => {
//         if (!res.ok) {
//             return Promise.reject(res.statusText);
//         }
//         return res.json();
//     }).then(data => data.results.map(normalizeMovie));
// }

export function getSimilar(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie));
}

export async function getMatches(id) {
    
    let movieIdArray;
    const resultsArray = [];
    const similarMovieArray = await getSimilar(id);
    const originalMovie = await searchById(id)

    const returnObj = {
        original: originalMovie,
        matches: resultsArray
    }

    if (similarMovieArray.length <= 3) {
        movieIdArray = similarMovieArray.map(movie => movie.id);
    } else {
        const top3Matches = similarMovieArray.slice(0, 3);
        movieIdArray = top3Matches.map(movie => movie.id);
    }

    const requests = movieIdArray.map((item) => {
        return searchById(item)
    });

    const final = await Promise.all(requests).then((values) => {
        values.map((item) => {
            resultsArray.push(item);
        })
    }).then(() => {return returnObj})
    console.log('KIWI return obj returns', returnObj)
    return final;
}