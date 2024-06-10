
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'

const ListSchools: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/schools');
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
            <h2>Список schools
            </h2>
            {userData && (
                <div>
                    <p>Name: {userData.name}</p>
            
                </div>
            )}

        </div>
    );
}

export default ListSchools;
