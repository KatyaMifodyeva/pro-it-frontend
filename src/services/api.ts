import axios from 'axios';
import { logout } from './logout';

//экземпляр axios
const api = axios.create({
  baseURL: 'http://example.com/api', //базовый URL для всех запросов
});

//интерсептор запросов
api.interceptors.request.use(
  (config) => {
    // Перехватываем и изменяем конфигурацию перед отправкой запроса
    const token = localStorage.getItem('accessToken'); //токен из локального хранилища
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок Authorization
    }
    return config;
  },
  (error) => {
    // Обрабатываем ошибки запросов
    return Promise.reject(error);
  }
);

// интерсептор ответов
api.interceptors.response.use(
  (response) => {
    // Перехватываем и обрабатываем успешные ответы
    return response;
  },
  async (error) => {
    // // Перехватываем и обрабатываем ошибки ответов
    // return Promise.reject(error);

    // Обрабатываем ошибки ответов
    if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
      // Если получили ошибку 401 Unauthorized и это не повторный запрос, пытаемся обновить токены
      try {
        // Отправляем запрос на обновление токенов с использованием refresh токена
        const response = await api.post('/refresh-token', { refresh_token: localStorage.getItem('refreshToken') });
        // Если обновление токенов успешно, сохраняем новые токены
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // Повторяем оригинальный запрос с обновленным access токеном
        return api(error.config);
      } catch (refreshErrozr) {
        // Если обновление токенов не удалось, перенаправляем пользователя на страницу входа или выполняем другие действия
        logout()
      }
     
    } 
    
    return Promise.reject(error);}
);

export default api;
