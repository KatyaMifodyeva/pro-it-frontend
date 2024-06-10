import React from 'react';
import { Link } from 'react-router-dom';

const ListFinances: React.FC = () => {
    return (
        <div>
            <h2>Список documents
            </h2>
            {/* Добавьте здесь содержимое страницы */}
            <li>
            <Link to="/dashboard/attendance" className="block p-4 hover:bg-gray-700">Посещаемость</Link>
            <Link to="/dashboard/finance-table" className="block p-4 hover:bg-gray-700">Оплаты занятий</Link>
          </li>
        </div>
    );
}

export default ListFinances;
