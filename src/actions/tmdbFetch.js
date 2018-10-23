const cacheByUrl = {}

export function cachedFetch(url, options) {
    if (cacheByUrl[url]) {
        return Promise.resolve(cacheByUrl[url])
    }
    //cache results in browser memory
    return fetch(url, { headers: options })
        .then(res => {
            console.log('HTTP RESPONSE', res)

            if (!res.ok) {
                return Promise.reject(res.statusText);
            }

            if (res._bodyText === '') {
                return { results: [] }
            }

            return res.json();
        })
        .then(res => { cacheByUrl[url] = res; return res });
}
