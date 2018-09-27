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

// Find Similar Movies (3)
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

    //Responses stores in this object    
    const resObj = {
        original: originalMovie,
        matches: resultsArray
    }

    //Only return first 3 matches
    if (similarMovieArray.length <= 3) {
        movieIdArray = similarMovieArray.map(movie => movie.id);
    } else {
        const top3Matches = similarMovieArray.slice(0, 3);
        movieIdArray = top3Matches.map(movie => movie.id);
    }

    //Make requests for each similar movie
    const requests = movieIdArray.map((item) => {
        return searchById(item)
    });

    //Store details of matches and return response object
    const final = await Promise.all(requests).then((values) => {
        values.map((item) => {
            resultsArray.push(item);
        })
    }).then(() => {return resObj})
    
    return final;
}