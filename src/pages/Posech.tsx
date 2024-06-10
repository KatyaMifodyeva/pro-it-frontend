import React, { useEffect, useRef } from 'react';
import { format, addDays, startOfMonth, endOfMonth } from 'date-fns';
import clsx from 'clsx';

interface Attendance {
  id: number;
  studentName: string;
  studentPhone: string;
  parentPhone: string;
  attendance: { [date: string]: string };
}

const attendances: Attendance[] = [
  {
    id: 101002,
    studentName: 'Касперук Анна Олеговна',
    studentPhone: '+375 29 123 12 23',
    parentPhone: '+375 29 123 12 23',
    attendance: {
      '2024-04-12': 'ДЗ задано',
      '2024-04-19': 'ДЗ выполнено',
      '2024-04-26': 'Отсутствовал',
      '2024-05-03': 'ДЗ выполнено',
      '2024-05-11': 'Болен',
      '2024-05-18': 'ДЗ не задано',
    },
  },
  {
    id: 101001,
    studentName: 'Иванов Иван Иванович',
    studentPhone: '+375 29 111 11 11',
    parentPhone: '+375 29 111 11 11',
    attendance: {
      '2023-10-12': 'ДЗ задано',
      '2023-10-19': 'ДЗ выполнено',
      '2023-10-26': 'Отсутствовал',
      '2023-11-03': 'ДЗ выполнено',
      '2023-11-11': 'Болен',
      '2023-11-18': 'ДЗ не задано',
    },
  },
  {
    id: 101002,
    studentName: 'Петров Петр Петрович',
    studentPhone: '+375 29 222 22 22',
    parentPhone: '+375 29 222 22 22',
    attendance: {
      '2023-10-12': 'ДЗ выполнено',
      '2023-10-19': 'ДЗ выполнено',
      '2023-10-26': 'Отсутствовал',
      '2023-11-03': 'ДЗ выполнено',
      '2023-11-11': 'Болен',
      '2023-11-18': 'ДЗ выполнено',
    },
  },
  // Добавьте остальные записи
];

const attendanceOptions = [
    { value: '', label: '-' },
    { value: 'ДЗ задано', label: 'ДЗ задано' },
    { value: 'ДЗ выполнено', label: 'ДЗ выполнено' },
    { value: 'Отсутствовал', label: 'Отсутствовал' },
    { value: 'Болен', label: 'Болен' },
    { value: 'ДЗ не задано', label: 'ДЗ не задано' },
  ];
const generateDates = (year: number, month: number): string[] => {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));
    const dates = [];
    let currentDate = startDate;
  
    while (currentDate <= endDate) {
      dates.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = addDays(currentDate, 1);
    }
  
    return dates;
  };
  
  const dates = generateDates(2023, 10); // Генерируем даты для октября 2023
  
  const AttendanceTable: React.FC = () => {
    const todayIndex = dates.findIndex(date => format(new Date(date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'));
    const todayRef = useRef<HTMLTableDataCellElement>(null);
  
    useEffect(() => {
      if (todayRef.current) {
        todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }, []);
  
    return (
        <div className="container mx-auto p-4">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold">Финансы. Посещаемость</h1>
            <div className="flex space-x-4 mt-2">
              <input
                type="text"
                placeholder="Поиск ученика"
                className="p-2 border border-gray-300 rounded"
              />
              <select className="p-2 border border-gray-300 rounded">
                <option>Клуб не выбран</option>
              </select>
              <select className="p-2 border border-gray-300 rounded">
                <option>День недели</option>
              </select>
              <select className="p-2 border border-gray-300 rounded">
                <option>Курс</option>
              </select>
            </div>
          </header>
          <div>
            <h2 className="text-xl font-semibold mb-2">Понедельник. Клуб. 15:30. Веб-программирование</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 sticky left-0 bg-white z-10">Код</th>
                    <th className="py-2 sticky left-16 bg-white z-10">ФИО ребенка</th>
                    <th className="py-2 sticky left-48 bg-white z-10">Телефон ребенка</th>
                    <th className="py-2 sticky left-80 bg-white z-10">Телефон родителей</th>
                    {dates.map(date => (
                      <th key={date} className={clsx('py-2', `${format(new Date(date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-gray-200' : ''}`)}>
                        {format(new Date(date), 'dd.MM.yyyy')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendances.map(attendance => (
                    <tr key={attendance.id} className="border-t">
                      <td className="py-2 sticky left-0 bg-white z-10">{attendance.id}</td>
                      <td className="py-2 sticky left-16 bg-white z-10">{attendance.studentName}</td>
                      <td className="py-2 sticky left-48 bg-white z-10">{attendance.studentPhone}</td>
                      <td className="py-2 sticky left-80 bg-white z-10">{attendance.parentPhone}</td>
                      {dates.map(date => (
                        <td
                          key={date}
                          className={clsx('py-2'  , `${format(new Date(date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-gray-200' : ''}`)}
                        >
                        <select
                        className="p-1 border border-gray-300 rounded w-20"
                        value={attendance.attendance[date] || ''}
                        onChange={(e) => {
                          // Можно добавить обработчик изменения посещаемости
                          // Например, dispatch для обновления состояния или вызов API для сохранения изменений
                        }}
                      >
                        {attendanceOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

  };
  
  export default AttendanceTable;