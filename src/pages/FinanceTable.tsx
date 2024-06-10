import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable, { Styles } from 'jspdf-autotable';
import { students, Student } from './data';
import { monthNamesEnToRu } from './types';
import { text } from 'stream/consumers';



const initialData = students
const serverTotalExpenses = 25490.3;
const schoolName = 'Лобанка';


//-----------------------------------------------------------
const FinanceTable: React.FC = () => {
  const [data, setData] = useState<Student[]>(initialData);
  const [activeMonths, setActiveMonths] = useState<Record<string, boolean>>(
    Object.keys(monthNamesEnToRu).reduce((acc, month) => {
      acc[month] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );
  // ({
  //   September: true,
  //   October: true,
  //   November: true,
  //   December: true,
  //   January: true,
  //   February: true,
  //   March: true,
  //   April: true,
  //   May: true,
  //   June: true,//9-5
  //   July: true,
  //   August: true,
  // });


  const getLastThreeMonths = () => {
    const currentMonthIndex = new Date().getMonth();

    const monthNames = Object.keys(monthNamesEnToRu);
    const lastThreeMonths = [];

    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonthIndex + 4 - i) % 12;
      lastThreeMonths.push(monthNames[monthIndex]);
    }

    return lastThreeMonths.reverse();
  };

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

  const curren = new Date();
  const generatePDF = () => {
    const doc = new jsPDF({
      format: 'a4',
      orientation: 'portrait',
    });

    doc.addFont('/fonts/Roboto-Regular.ttf', 'Roboto-Regular', 'normal')
    doc.setFont('Roboto-Regular');


    const formattedDat = `${curren.getDate()}.${curren.getMonth() + 1}.${curren.getFullYear()}`;


    const lastThreeMonths = getLastThreeMonths();
    const monthsText = lastThreeMonths.map(month => monthNamesEnToRu[month]).join(', ');



    const logo = new Image();
    logo.src = '/assets/svg/logo.png'; // Замените на путь к логотипу
    doc.addImage(logo, 'PNG', 95, 10, 20, 20);

    doc.text(`Оплата занятий за: ${monthsText} на ${formattedDat}`, 14, 40);

    doc.text('Школа: ' + schoolName, 14, 50);



    doc.text(`Баланс на сегодняшний день: ${totalBalance} руб.`, 14, 70);
    doc.text(`Всего затрат: ${serverTotalExpenses} руб.`, 14, 80);
    doc.text(`Дополнительно: ${totalRate} руб.`, 14, 90);
    doc.text(`По ставке за месяц: ${totalRate} руб.`, 14, 100);

    doc.addPage('l', 'landscape')
    doc.text(`Оплата занятий за ${monthsText} на ${formattedDat}`, 14, 20);

    const tableColumn = ['Код', 'ФИО', 'ФИО Родителей', 'Телефон родителей', 'Ставка', ...lastThreeMonths.map(month => monthNamesEnToRu[month])];
    const tableRows: (string | number)[][] = [];


    sortedData.forEach(student => {
      const studentData = [
        student.code,
        student.name,
        student.parentName,
        student.parentPhone,
        student.rate,
        ...lastThreeMonths.map(month => (activeMonths[month] ? student.months[month] : '-')),
      ];
      tableRows.push(studentData);
    });
    const totals = Object.keys(activeMonths).map(month =>
      sortedData.reduce((sum, student) => {
        const monthValue = activeMonths[month] ? student.months[month] || 0 : 0;
        return sum + monthValue;
      }, 0)
    );

    console.log('Totals:', totals); // Логируем суммы для проверки
    // Получение значений из totals для последних трех месяцев
  const lastThreeTotals = lastThreeMonths.map(month => {
    const index = Object.keys(activeMonths).indexOf(month);
    return totals[index];
  });
    const totalRate2 = sortedData.reduce((sum, student) => sum + student.rate, 0);

    const totalRow = ['', '', '', 'Итого', totalRate2, ...lastThreeTotals];
    tableRows.push(totalRow);
    const columnStyle: { [key: string]: Partial<Styles> } = {
      '0': { minCellWidth: 20 },
      '1': { minCellWidth: 50 },
      '2': { minCellWidth: 50 },//parentName
      '3': { minCellWidth: 40 }, //parentPhone
      '4': { minCellWidth: 20 }, //rate
      '5': { minCellWidth: 30 }, //date 1
      '6': { minCellWidth: 30 },
      '7': { minCellWidth: 30 },
    };
    const headStyles: Partial<Styles> = {
      font: 'Roboto-Regular',
      fontSize: 10,
      fontStyle: 'bold',
      valign: 'middle',
      minCellHeight: 10,
    };

    autoTable(doc, {
      head: [tableColumn], body: tableRows, startY: 30, margin: { top: 10 },
      columnStyles: columnStyle, styles: { font: 'Roboto-Regular', fontStyle: 'normal', cellPadding: 4 },
      headStyles: headStyles,
    });


    const currentDate = new Date().toISOString().slice(0, 10);
    const fileName = `${schoolName}_${currentDate}_report.pdf`;
    doc.save(fileName)
  };



  return (
    <div className="overflow-auto">
      <button onClick={generatePDF} className="mb-4 bg-blue-500 py-2 px-4 rounded">Скачать PDF</button>
      <table className="min-w-full bg-white">
        <thead className="">
          <tr>
            <th className="w-1/12 p-2 sticky left-0 bg-white z-50">Код</th>
            <th className="w-2/12 p-2 sticky left-16 bg-white  z-50">ФИО</th>


            <th className="w-2/12 p-2 sticky left-48 bg-white  z-50">ФИО Родителей</th>
            <th className="w-2/12 p-2 sticky left-80 bg-white  z-50">Телефон родителей</th>
            <th className="w-1/12 p-2 sticky left-112 bg-white  z-50">Год</th>
            <th className="w-1/12 p-2 sticky left-144 bg-white  z-50">Ставка</th>
            {Object.keys(monthNamesEnToRu).map(month => (
              <th key={month} className="w-1/12 p-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={activeMonths[month]}
                    onChange={() => handleMonthToggle(month)}
                  />
                  <span>{monthNamesEnToRu[month]}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((student) => (
            <tr key={student.code}>
              <td className="w-1/12 border p-2 sticky left-0 bg-white  z-50">{student.code}</td>
              <td className="border p-2 w-2/12 sticky left-16 bg-white  z-50">{student.name}</td>
              <td className="border w-2/12 p-2 sticky left-48 bg-white  z-50">{student.parentName}</td>
              <td className="border w-2/12 p-2 sticky left-80 bg-white  z-50">{student.parentPhone}</td>
              <td className="border w-1/12 p-2 sticky left-112 bg-white  z-50">{student.year}</td>
              <td className="border w-1/12 p-2 sticky left-144 bg-white  z-50">{student.rate}</td>
              {Object.keys(monthNamesEnToRu).map((month) => (
                <td key={month} className="border p-2">
                  {activeMonths[month] ? student.months[month] : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="border p-2 text-right font-bold">Итого:</td>
            {Object.keys(monthNamesEnToRu).map((month) => (
              <td key={month} className="border p-2 font-bold">
                {totalMonthlyPayments(month)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FinanceTable;