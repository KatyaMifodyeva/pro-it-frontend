import React, { useState } from 'react';

interface Student {
  code: string;
  name: string;
  parentName: string;
  parentPhone: string;
  year: number;
  left: boolean;
  rate: number;
  months: Record<string, number>;
  total?: number;
}

const initialData: Student[] = [
    {
      code: '101002',
      name: 'Касперчук Анна Олеговна',
      parentName: 'Касперчук Антон Иванович',
      parentPhone: '+375 29 123 12 23',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 90,
        October: 160,
        November: 160,
        December: 90,
        January: 160,
        February: 160,
        March: 90,
        April: 160,
        May: 160,
        June: 90,
        July: 160,
        August: 160,
      },
    },
    {
      code: '101003',
      name: 'Иванов Иван Иванович',
      parentName: 'Иванов Олег Антонович',
      parentPhone: '+375 29 161 29 19',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 90,
        October: 160,
        November: 160,
        December: 90,
        January: 160,
        February: 160,
        March: 90,
        April: 160,
        May: 160,
        June: 90,
        July: 160,
        August: 160,
      },
    },
    {
      code: '101004',
      name: 'Петров Петр Петрович',
      parentName: 'Петров Антон Петрович',
      parentPhone: '+375 29 162 29 20',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 100,
        October: 170,
        November: 170,
        December: 100,
        January: 170,
        February: 170,
        March: 100,
        April: 170,
        May: 170,
        June: 100,
        July: 170,
        August: 170,
      },
    },
    {
      code: '101005',
      name: 'Сидоров Сидор Сидорович',
      parentName: 'Сидоров Иван Сидорович',
      parentPhone: '+375 29 163 29 21',
      year: 1,
      left: false,
      rate: 90,
      months: {
        September: 110,
        October: 180,
        November: 180,
        December: 110,
        January: 180,
        February: 180,
        March: 110,
        April: 180,
        May: 180,
        June: 110,
        July: 180,
        August: 180,
      },
    },
    {
      code: '101006',
      name: 'Смирнов Алексей Алексеевич',
      parentName: 'Смирнов Петр Алексеевич',
      parentPhone: '+375 29 164 29 22',
      year: 1,
      left: false,
      rate: 120,
      months: {
        September: 120,
        October: 190,
        November: 190,
        December: 120,
        January: 190,
        February: 190,
        March: 120,
        April: 190,
        May: 190,
        June: 120,
        July: 190,
        August: 190,
      },
    },
    {
      code: '101007',
      name: 'Кузнецов Дмитрий Дмитриевич',
      parentName: 'Кузнецов Сергей Дмитриевич',
      parentPhone: '+375 29 165 29 23',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 130,
        October: 200,
        November: 200,
        December: 130,
        January: 200,
        February: 200,
        March: 130,
        April: 200,
        May: 200,
        June: 130,
        July: 200,
        August: 200,
      },
    },
    {
      code: '101008',
      name: 'Михайлов Михаил Михайлович',
      parentName: 'Михайлов Андрей Михайлович',
      parentPhone: '+375 29 166 29 24',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 140,
        October: 210,
        November: 210,
        December: 140,
        January: 210,
        February: 210,
        March: 140,
        April: 210,
        May: 210,
        June: 140,
        July: 210,
        August: 210,
      },
    },
    {
      code: '101009',
      name: 'Новиков Николай Николаевич',
      parentName: 'Новиков Игорь Николаевич',
      parentPhone: '+375 29 167 29 25',
      year: 1,
      left: false,
      rate: 120,
      months: {
        September: 150,
        October: 220,
        November: 220,
        December: 150,
        January: 220,
        February: 220,
        March: 150,
        April: 220,
        May: 220,
        June: 150,
        July: 220,
        August: 220,
      },
    },{
        code: '101010',
        name: 'Федоров Федор Федорович',
        parentName: 'Федоров Николай Федорович',
        parentPhone: '+375 29 168 29 26',
        year: 1,
        left: false,
        rate: 150,
        months: {
          September: 160,
          October: 230,
          November: 230,
          December: 160,
          January: 230,
          February: 230,
          March: 160,
          April: 230,
          May: 230,
          June: 160,
          July: 230,
          August: 230,
        },
      },
      {
        code: '101011',
        name: 'Семёнов Семён Семёнович',
        parentName: 'Семёнов Павел Семёнович',
        parentPhone: '+375 29 169 29 27',
        year: 1,
        left: false,
        rate: 150,
        months: {
          September: 170,
          October: 240,
          November: 240,
          December: 170,
          January: 240,
          February: 240,
          March: 170,
          April: 240,
          May: 240,
          June: 170,
          July: 240,
          August: 240,
        },
      },
    ];

const serverTotalExpenses = 25490.3;

const FinanceTable: React.FC = () => {
  const [data, setData] = useState<Student[]>(initialData);
  const [activeMonths, setActiveMonths] = useState<Record<string, boolean>>({
    September: true,
    October: true,
    November: true,
    December: true,
    January: true,
    February: true,
    March: true,
    April: true,
    May: true,
    June: true,
    July: true,
    August: true,
  });

  const handleMonthToggle = (month: string) => {
    setActiveMonths({
      ...activeMonths,
      [month]: !activeMonths[month],
    });
  };

  const calculateBalance = () => {
    return data.map(student => {
      const total = Object.keys(student.months)
        .filter(month => activeMonths[month])
        .reduce((sum, month) => sum + student.months[month], 0);
      return {
        ...student,
        total,
      };
    });
  };

  const sortedData = calculateBalance();

  const totalMonthlyPayments = (month: string) => {
    return sortedData.reduce((sum, student) => sum + (student.months[month] || 0), 0);
  };

  const totalRate = data.reduce((sum, student) => sum + student.rate, 0);

  const totalBalance = sortedData.reduce((sum, student) => sum + (student.total || 0), 0);

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white">
        <thead className="">
          <tr>
            <th className="w-1/12 p-2 sticky left-0 bg-gray-800">Код</th>
            <th className="w-2/12 p-2 sticky left-16 bg-gray-800">ФИО</th>
            <th className="w-2/12 p-2 sticky left-48 bg-gray-800">ФИО Родителей</th>
            <th className="w-2/12 p-2 sticky left-80 bg-gray-800">Телефон родителей</th>
            <th className="w-1/12 p-2 sticky left-112 bg-gray-800">Год</th>
            <th className="w-1/12 p-2 sticky left-128 bg-gray-800">Выбыл</th>
            <th className="w-1/12 p-2 sticky left-144 bg-gray-800">Ставка</th>
            {Object.keys(activeMonths).map(month => (
              <th key={month} className="w-1/12 p-2">
                {month}
                <input
                  type="checkbox"
                  checked={activeMonths[month]}
                  onChange={() => handleMonthToggle(month)}
                />
              </th>
            ))}
            <th className="w-1/12 p-2 sticky right-0 bg-gray-800">Баланс</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(student => (
            <tr key={student.code}>
              <td className="border p-2 sticky left-0 bg-white">{student.code}</td>
              <td className="border p-2 sticky left-16 bg-white">{student.name}</td>
              <td className="border p-2 sticky left-48 bg-white">{student.parentName}</td>
              <td className="border p-2 sticky left-80 bg-white">{student.parentPhone}</td>
              <td className="border p-2 sticky left-112 bg-white">{student.year}</td>
              <td className="border p-2 sticky left-128 bg-white">{student.left ? 'Да' : 'Нет'}</td>
              <td className="border p-2 sticky left-144 bg-white">{student.rate}</td>
              {Object.keys(student.months).map(month => (
                <td key={month} className="border p-2">
                 <input
                    type="number"
                    value={student.months[month]}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setData(prevData =>
                        prevData.map(s =>
                          s.code === student.code
                            ? {
                                ...s,
                                months: { ...s.months, [month]: newValue },
                              }
                            : s
                        )
                      );
                    }}
                  />
                </td>
              ))}
              <td className="border p-2 sticky right-0 bg-white">{student.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <td colSpan={7} className="text-right font-bold p-2">Всего затрат</td>
            <td colSpan={Object.keys(activeMonths).length} className="text-left font-bold p-2">{serverTotalExpenses}</td>
          </tr>
          <tr>
            <td colSpan={7} className="text-right font-bold p-2">Дополнительно</td>
            <td colSpan={Object.keys(activeMonths).length} className="text-left font-bold p-2">{totalRate}</td>
          </tr>
          <tr>
            <td colSpan={7} className="text-right font-bold p-2">Баланс</td>
            <td colSpan={Object.keys(activeMonths).length} className="text-left font-bold p-2">{totalBalance}</td>
          </tr>
          <tr>
            <td colSpan={7} className="text-right font-bold p-2">Сумма за месяц</td>
            {Object.keys(activeMonths).map(month => (
              <td key={month} className="border p-2">{totalMonthlyPayments(month)}</td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FinanceTable;