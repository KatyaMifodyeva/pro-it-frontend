
export const logout = () => {
    // Очистить токены из локального хранилища
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');

    window.location.href = '/';//используется для перенаправления пользователя на другую страницу путем изменения URL-адреса браузера. Это приводит к полной перезагрузке страницы.
  }
  