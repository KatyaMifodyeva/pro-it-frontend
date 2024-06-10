import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../_components/Dashboard/ManagerSidebar';
import NavBar from '../_components/Dashboard/Navbar';

const ManagerDashboardPage: React.FC = () => {
    return (
        <div>
                 <NavBar />
            <div className="flex">
                <ManagerSidebar />
                <div className="flex-1 p-4">
                <h2>Панель управляющего</h2>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ManagerDashboardPage;
