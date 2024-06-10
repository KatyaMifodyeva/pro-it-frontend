import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar bg-gray-800 text-white w-64 min-h-screen">

        <ul>
          <li>
            <Link to="/dashboard" className="block p-4 hover:bg-gray-700">Главная</Link>  {/* logo */}
           
          </li>
          <li>
            <Link to="/dashboard/coordinators" className="block p-4 hover:bg-gray-700">Координаторы</Link>
          </li>
          <li>
            <Link to="/dashboard/teachers" className="block p-4 hover:bg-gray-700">Преподаватели</Link>
          </li>
          <li>
            <Link to="/dashboard/students" className="block p-4 hover:bg-gray-700">Ученики</Link>
          </li>
          <li>
            <Link to="/dashboard/schools" className="block p-4 hover:bg-gray-700">Школы</Link>
          </li>
          <li>
            <Link to="/dashboard/finances" className="block p-4 hover:bg-gray-700">Финансы</Link>
          </li>
          <li>
            <Link to="/dashboard/documents" className="block p-4 hover:bg-gray-700">Документы</Link>
          </li>
        </ul>
      </div>
    );
  };
  

export default Sidebar;
