const cacheByUrl = {}

function cachedFetch(url, options) {
    if (cacheByUrl[url]) {
        return Promise.resolve(cacheByUrl[url])
    }
    //cache results in browser memory
    return fetch(url, {headers: options})
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(res => { cacheByUrl[url] = res; return res });
}

export function getStreamingAvailability(title) {
    const url = `https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=${title}`;
    const options = {
        "X-Mashape-Key": "zixfzYPHfKmshNNxNEW2n8bR7l3Gp1cNGdljsnhf2G7uUj9b0L",
        "Accept": "application/json"
    }
    return cachedFetch(url, options);
}

export async function getStreaming(title) {
    let singleResult;
    const initialResultsArray = await getStreamingAvailability(title);
    //Only return top result
    if (initialResultsArray.results <= 1) {
        singleResult = initialResultsArray.results
    } else {
        singleResult = initialResultsArray.results[0];
    }
    return singleResult;
}