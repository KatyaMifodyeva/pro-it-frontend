import React from 'react';
import { format, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import clsx from 'clsx';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Веб-программирование',
    date: new Date(2024, 3, 1, 18, 40), // April 1, 2024, 18:40
    time: '18:40 - 20:10',
    location: 'Кабинет 10'
  },
  // Добавьте остальные события
];

const Schedule: React.FC = () => {
  const currentMonth = new Date(2024, 3); // April 2024
  const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={clsx('p-2 border',`${!isSameMonth(day, currentMonth) ? 'bg-gray-100' : ''}`)}
          key={day.toString()}
        >
          <span className={clsx('text-sm',`{${isSameDay(day, new Date()) ? 'text-blue-500' : ''}`)}>
            {formattedDate}
          </span>
          {events
            .filter(event => isSameDay(event.date, cloneDay))
            .map(event => (
              <div key={event.id} className="mt-2 bg-blue-100 p-1 rounded">
                <div className="text-xs">{event.title}</div>
                <div className="text-xs">{event.time}</div>
              </div>
            ))}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Расписание</h1>
        <div className="flex space-x-4 mt-2">
          <input
            type="text"
            placeholder="Федоров Федор Федорович"
            className="p-2 border border-gray-300 rounded"
          />
          <select className="p-2 border border-gray-300 rounded">
            <option>Клуб Дурдом</option>
          </select>
          <select className="p-2 border border-gray-300 rounded">
            <option>Кабинет 10</option>
          </select>
        </div>
      </header>
      <div className="grid grid-cols-7 text-center font-semibold border-b">
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
      </div>
      {rows}
    </div>
  );
};

export default Schedule;