// auth.js
export function logout() {
    localStorage.removeItem('jwtToken');  // Asegúrate de usar la clave correcta aquí
    window.location.href = '/login';      // Redirecciona al usuario al login
}

export function handleLoginSuccess(token) {
    localStorage.setItem('jwtToken', token); // Guardar el token con la clave 'jwtToken'
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

