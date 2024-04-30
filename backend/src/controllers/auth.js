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
    // Aquí podrías redirigir al usuario al login usando react-router o recargar la página
    window.location.href = '/login'; // Asumiendo que usas react-router
}
