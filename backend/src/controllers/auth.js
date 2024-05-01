// auth.js
export function handleLoginSuccess(token) {
    localStorage.setItem('jwtToken', token);
}

export function getToken() {
    return localStorage.getItem('jwtToken');
}

export function authenticatedFetch(url, options = {}) {
    const token = getToken();
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    return fetch(url, {
        ...options,
        headers: headers
    });
}

export function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login'; 
}
