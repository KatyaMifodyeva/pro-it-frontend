
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage'
import AdminDashboardPage
  from './pages/AdminDashboardPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import ListCoordinators from './pages/ListCoordinators';
import ListTeachers from './pages/ListTeachers';
import ListStudents from './pages/ListStudents';
import ListFinances from './pages/ListFinances';
import ListDocuments from './pages/ListDocuments';
import NotFoundPage from './pages/NotFoundPage';
import ListManagers from './pages/ListManagers';
import ListSchools from './pages/ListSchools';
import NavBar from './_components/Dashboard/Navbar';
import Schedule from './pages/Schedule';
import AttendanceTable from './pages/Posech';
import FinanceTable from './pages/FinanceTable';
import TabMenu from './pages/TabMenu';



const App: React.FC = () => {
  const Role = localStorage.getItem('role')
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  if (!role) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {role  === 'admin' && (
          <>
        {/* <NavBar /> */}
            <Route path="/dashboard" element={<AdminDashboardPage />} >
              <Route path="managers" element={<ListManagers />} />
              <Route path="coordinators" element={<ListCoordinators />} />
              <Route path="teachers" element={<ListTeachers />} />
              <Route path="students" element={<ListStudents />} />
              <Route path="schools" element={<ListSchools />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="attendance" element={<AttendanceTable />} />
              <Route path="finances" element={<ListFinances />} />
              <Route path="finance-table" element={<FinanceTable />} />
              <Route path="documents" element={<ListDocuments />} />
             
            </Route>

          </>
        )}
        {role === 'manager' && (
          <>
                {/* <NavBar /> */}
            <Route path="/dashboard" element={<ManagerDashboardPage />} >
              <Route path="coordinators" element={<ListCoordinators />} />
              <Route path="teachers" element={<ListTeachers />} />
              <Route path="students" element={<ListStudents />} />
              <Route path="schools" element={<ListSchools />} />
              <Route path="finances" element={<ListFinances />} />
              <Route path="documents" element={<ListDocuments />} />
            </Route>
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="/" element={<AuthPage />} />
        {routesConfig[role]?.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        )) || <Navigate to="/" />} */}
      </Routes>
    </Router>
  );
}

export default App;
