
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'

const ListStudents: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/students');
                setUserData(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                // Перенаправляем пользователя на страницу входа в случае ошибки
                navigate('/');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Список students
            </h2>
            {userData && (
                <div>
                    <p>Имя: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    {/* Дополнительная информация о пользователе */}
                </div>
            )}

        </div>
    );
}

export default ListStudents;
