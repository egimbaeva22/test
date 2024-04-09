const initialState = {
    username: '',
    password: '',
    verifyPassword: '',
    error: '',
    registeredUser: localStorage.getItem('registeredUser') || '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return {
                ...state,
                registeredUser: action.payload.username,
                password: action.payload.password,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: '',
            }
        default:
            return state
    }
}

export default reducer
