import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, setError, clearError } from '../redux/action'
import './AuthForm.css'

const AuthForm = () => {
    const dispatch = useDispatch()
    const { error, registeredUser } = useSelector(state => state.user)
    const [isRegistered, setIsRegistered] = useState(false)

    const [localUsername, setLocalUsername] = useState('')
    const [localPassword, setLocalPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    const handleUsernameChange = (event) => {
        dispatch(clearError())
        setLocalUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        dispatch(clearError())
        setLocalPassword(event.target.value)
    }

    const handleVerifyPasswordChange = (event) => {
        dispatch(clearError())
        setVerifyPassword(event.target.value)
    }

    const handleRegister = () => {
        if (!localUsername || !localPassword || !verifyPassword) {
            dispatch(setError('Заполните все поля'))
            return
        }
        if (localPassword !== verifyPassword) {
            dispatch(setError('Пароли не совпадают'))
            return
        }
        if (localUsername === registeredUser) {
            dispatch(setError('Такой пользователь уже существует'))
            return
        }else if (isRegistered === true) {
            setLocalUsername('')
            setLocalPassword('')
            setVerifyPassword('')
        }
        localStorage.setItem('registeredUser', localUsername)
        localStorage.setItem('registeredPassword', localPassword)

        setLocalUsername('');
        setLocalPassword('');
        setVerifyPassword('');

        dispatch(registerUser(localUsername, localPassword))
        dispatch(clearError())
        setIsRegistered(true)
    }

    return (
        <div className="auth-form">
            <input type="text" value={localUsername} onChange={handleUsernameChange} placeholder="Имя пользователя" />
            <br />
            <input type="password" value={localPassword} onChange={handlePasswordChange} placeholder="Пароль" />
            <br />
            <input type="password" value={verifyPassword} onChange={handleVerifyPasswordChange} placeholder="Подтверждение пароля" />
            <br />
            <button onClick={handleRegister}>Зарегистрироваться</button>
            {error && <p>{error}</p>}
            {isRegistered && <p style={{ color: 'green' }}>Регистрация прошла успешно, теперь войдите в аккаунт</p>}
        </div>
    )
}

export default AuthForm
