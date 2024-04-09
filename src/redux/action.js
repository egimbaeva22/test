export const registerUser = (username, password) => ({
    type: 'REGISTER_USER',
    payload: { username, password },
})

export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
})

export const clearError = () => ({
    type: 'CLEAR_ERROR',
})

export const loginUser = (username, password) => {
    return (dispatch) => {
        const storedUsername = localStorage.getItem('registeredUser')
        const storedPassword = localStorage.getItem('registeredPassword')

        if (username === storedUsername && password === storedPassword) {
            dispatch({ type: 'LOGIN_USER', payload: 'Вход выполнен успешно' })
            dispatch(clearError())
        } else {
            dispatch(setError('Неправильное имя пользователя или пароль'))
        }
    }
}
