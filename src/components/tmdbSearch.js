// Find initial movie
function _search(title) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1&include_adult=false&query=${title}`).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(data => data.results.map(movie => ({ 
        title: movie.title,
        id: movie.id,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    })));
}

export function search(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(_search(title)), 500);
    });
}


// Find Movie by ID
function _searchById(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    })
}

export function searchById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(_searchById(id)), 500);
    });
}


// Find similar movies from initial movie ID
function _getSimilar(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(data => data.results.map(movie => movie.title));
}

export function getSimilar(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(_getSimilar(id)), 500);
    });
}