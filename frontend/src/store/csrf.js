const csrfFetch = async function(url, options = {}) {
    options.headers ||= {};
    options.method ||= 'GET';
    
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);

    if(res.status >= 400) throw res;

    return res;
}


export const restoreCSRF = async () => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    // let data = await res.json;
    // sessionStorage.setItem()
    return res;
}

export const storeCSRFToken = (Response) => {
    const token = Response.headers.get('X-CSRF-Token');
    if(token){
        sessionStorage.setItem('X-CSRF-Token', token);
    }
}

export default csrfFetch;