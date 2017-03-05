import 'whatwg-fetch'

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = new Error(`Failed to fetch from ${response.url}`)
        error.response = response
        throw error
    }
}

function fetchJson(options) {
    const {url, method, auth, body} = options

    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: body
    }).then(checkStatus)
}

export function get(url, options) {
    const {auth} = options

    return fetchJson({url, auth, method: 'GET'})
}