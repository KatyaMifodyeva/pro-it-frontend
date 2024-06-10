// src/components/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Импорт созданного экземпляра api

const AuthPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // const response = await api.post('/login', { username, password });
            // if (response.status === 200) {
            //     // Успешная аутентификация
            //     localStorage.setItem('accessToken', response.data.accessToken);
            //     localStorage.setItem('refreshToken', response.data.refreshToken);
            //     if (rememberMe) {
            //         localStorage.setItem('role', response.data.role);
            //     } else {
            //         sessionStorage.setItem('role', response.data.role);
            //     }
            //     navigate('/dashboard');
            // } else {
            //     setError('Неверные учетные данные');
            // }
            if (username === 'admin' && password === 'admin') {
                // Авторизация успешна для админа
                if (rememberMe) {
                    localStorage.setItem('role', 'admin');
                } else {
                    sessionStorage.setItem('role', 'admin');
                }

                navigate('/dashboard');
            } else if (username === 'manager' && password === 'manager') {
                // Авторизация успешна для менеджера
                if (rememberMe) {
                    localStorage.setItem('role', 'manager');
                } else {
                    sessionStorage.setItem('role', 'manager');
                }

                navigate('/dashboard');
            } else {
                // Ошибка авторизации
                setError('Неверное имя пользователя или пароль');
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            setError('Ошибка аутентификации');
        }
    };

    return (
        <div className='flex flex-col relative justify-center items-center w-screen h-screen'>
            <img src="/assets/img/back.jpg" alt="" className='w-screen h-screen absolute z-[-1] top-0 left-0'></img>
            <div className='flex flex-col bg-white px-[88px] py-[90px] w-fit h-fit'>
                <img src="/assets/svg/logo.svg" alt="" className='w-auto h-[52px]'></img>
                <h2 className='text-headline'>Вход в аккаунт</h2>
                <form onSubmit={handleLogin} className='flex flex-col w-full gap-[16px]'>
                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor="username" className='text-sm  text-gray'>Логин:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='bg-lightGray border-darkGray h-[42px] border-[0.6px] rounded-input px-[8px] py-[14px]'
                        />
                    </div>
                    <div className='flex flex-col gap-[2px]'>
                        <label htmlFor="password" className='text-sm  text-gray'>Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-lightGray border-darkGray h-[42px] border-[0.6px] rounded-input px-[8px] py-[14px]'
                        />
                    </div>
                    <div className='flex items-center gap-[8px]'>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className='h-[16px] w-[16px]'
                        />
                        <label htmlFor="rememberMe" className='text-sm text-black'>Запомнить меня</label>
                    </div>
                    <button type="submit" className='bg-blue px-[15px] text-md py-[10px] rounded-button text-white text-center w-full'>Войти</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default AuthPage;
