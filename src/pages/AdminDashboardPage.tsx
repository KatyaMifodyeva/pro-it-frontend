import React from 'react';
import Sidebar from '../_components/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import NavBar from '../_components/Dashboard/Navbar';

const AdminDashboardPage: React.FC = () => {
    return (
        <div>

            <NavBar />
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full p-4">
                    <h2>Административная панель</h2>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
