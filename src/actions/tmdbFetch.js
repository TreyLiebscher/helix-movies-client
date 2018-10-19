const cacheByUrl = {}

export function cachedFetch(url, options) {
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
