
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
// Пример данных
const rows = [
    { id: 1, fullName: 'Касперчук Анна Олеговна', email: 'e.name@gmail.com', address: '07/02/2024', phone: '+375 29 123 12 23', experience: '5 лет', birthDate: '12.03.1993' },
    { id: 2, fullName: 'Батаршин Евгений Иванович', email: 'e.name@gmail.com', address: '13/01/2024', phone: '+375 29 123 56 12', experience: '5 лет', birthDate: '' },
    { id: 3, fullName: 'Осипов Валентин Игоревич', email: 'e.name@gmail.com', address: '23/12/2023', phone: '+375 29 123 12 23', experience: '5 лет', birthDate: '' },
    { id: 4, fullName: 'Иванова Надежда Олеговна', email: 'e.name@gmail.com', address: '02/02/2024', phone: '+375 29 123 12 23', experience: '5 лет', birthDate: '' },
  ];
  
  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'ФИО', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'address', headerName: 'Адрес', width: 150 },
    { field: 'phone', headerName: 'Телефон', width: 150 },
    { field: 'experience', headerName: 'Опыт', width: 100 },
    { field: 'birthDate', headerName: 'Дата рождения', width: 150 },
  ];


  interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    experience: string;
    dob: string;
  }
  
  const initialUsers: User[] = [
    {
      id: 1,
      name: 'Касперук Анна Олеговна',
      email: 'e.name@gmail.com',
      address: '07/02/2024',
      phone: '+375 29 123 12 23',
      experience: '5 лет',
      dob: '12.03.1993',
    },
    {
      id: 461,
      name: 'Морозова Юлия Леонидовна',
      email: 'shchukinparfen@ooo.edu',
      address: '03/09/2023',
      phone: '+7 (664) 017-7075',
      experience: '8 лет',
      dob: '09.09.1972',
    },
    {
      id: 385,
      name: 'Евдокия Львовна Зиновьева',
      email: 'nesterovbudimir@gmail.com',
      address: '12/09/2023',
      phone: '+7 363 110 7040',
      experience: '7 лет',
      dob: '30.07.1996',
    },
    {
      id: 305,
      name: 'Ангелина Владиславовна Брагина',
      email: 'filaret22@ao.info',
      address: '08/09/2023',
      phone: '+7 (833) 939-9345',
      experience: '5 лет',
      dob: '23.07.1971',
    },
    {
      id: 388,
      name: 'Гусев Ростислав Абрамович',
      email: 'zhdanovalora@npo.biz',
      address: '09/05/2024',
      phone: '+7 604 041 84 96',
      experience: '2 лет',
      dob: '27.05.1965',
    },
    {
      id: 934,
      name: 'Рожков Флорентин Филимонович',
      email: 'ysoloveva@zao.biz',
      address: '19/08/2023',
      phone: '+7 028 114 7272',
      experience: '6 лет',
      dob: '28.08.1967',
    },
    {
      id: 519,
      name: 'Лебедева Анна Аскольдовна',
      email: 'rozhkovapollinari@ip.org',
      address: '23/10/2023',
      phone: '+7 (417) 108-50-09',
      experience: '15 лет',
      dob: '22.07.1981',
    },
    {
      id: 171,
      name: 'Степанова Анастасия Яковлевна',
      email: 'apollinari_36@ptk.ru',
      address: '08/03/2024',
      phone: '+7 534 644 77 78',
      experience: '9 лет',
      dob: '25.03.1984',
    },
    {
      id: 940,
      name: 'Регина Вадимовна Гусева',
      email: 'mkalashnikov@mail.ru',
      address: '08/08/2023',
      phone: '82531414282',
      experience: '20 лет',
      dob: '04.08.1968',
    },
  ];
const ListManagers: React.FC = () => {
//     // const [selectionModel, setSelectionModel] = React.useState<GridRowSelectionModel>([]);

//     return (
//         <div>
//             <h2>Список  managerov
//             </h2>
//             <div style={{ height: 400, width: '100%' }}>
//       {/* <DataGrid
//         rows={rows}
//         columns={columns}
//         // pageSize={5}
//         checkboxSelection
//         // onSelectionModelChange={(newSelectionModel: React.SetStateAction<GridRowSelectionModel>) => {
//         //   setSelectionModel(newSelectionModel);
//         // }}
//         // selectionModel={selectionModel}
//       /> */}
//     </div>
//         </div>
//     );
// }
const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Поиск управляющего"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Добавить</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">xtr</th>
            <th className="py-2">ФИО</th>
            <th className="py-2">E-mail</th>
            <th className="py-2">Адрес</th>
            <th className="py-2">Телефон</th>
            <th className="py-2">Опыт</th>
            <th className="py-2">Дата рождения</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-t">
              <td className="py-2"></td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.address}</td>
              <td className="py-2">{user.phone}</td>
              <td className="py-2">{user.experience}</td>
              <td className="py-2">{user.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListManagers;
