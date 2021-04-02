const AUTH_TOKEN_KEY = 'auth-token'

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return authToken !== "";
}
