
export interface Student {
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
  
  export const students: Student[] = [
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
      name: 'Петрова Анна Олеговна',
      parentName: 'Петров Антон Иванович',
      parentPhone: '+375 29 123 12 24',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 100,
        October: 150,
        November: 160,
        December: 90,
        January: 160,
        February: 170,
        March: 90,
        April: 160,
        May: 160,
        June: 100,
        July: 160,
        August: 160,
      },
    },
    {
      code: '101005',
      name: 'Сидоров Сергей Иванович',
      parentName: 'Сидоров Иван Антонович',
      parentPhone: '+375 29 161 29 20',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 110,
        October: 160,
        November: 150,
        December: 80,
        January: 170,
        February: 160,
        March: 90,
        April: 170,
        May: 150,
        June: 90,
        July: 170,
        August: 160,
      },
    },
    {
      code: '101006',
      name: 'Смирнов Алексей Владимирович',
      parentName: 'Смирнов Владимир Алексеевич',
      parentPhone: '+375 29 123 12 25',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 120,
        October: 160,
        November: 160,
        December: 90,
        January: 160,
        February: 160,
        March: 90,
        April: 160,
        May: 160,
        June: 120,
        July: 160,
        August: 160,
      },
    },
    {
      code: '101007',
      name: 'Кузнецова Мария Владимировна',
      parentName: 'Кузнецов Владимир Маркович',
      parentPhone: '+375 29 161 29 21',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 130,
        October: 160,
        November: 140,
        December: 100,
        January: 160,
        February: 150,
        March: 90,
        April: 150,
        May: 140,
        June: 90,
        July: 150,
        August: 160,
      },
    },
    {
      code: '101008',
      name: 'Григорьев Иван Сергеевич',
      parentName: 'Григорьев Сергей Иванович',
      parentPhone: '+375 29 123 12 26',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 140,
        October: 150,
        November: 160,
        December: 110,
        January: 160,
        February: 150,
        March: 90,
        April: 150,
        May: 150,
        June: 140,
        July: 150,
        August: 160,
      },
    },
    {
      code: '101009',
      name: 'Ковалёв Алексей Владимирович',
      parentName: 'Ковалёв Владимир Алексеевич',
      parentPhone: '+375 29 161 29 22',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 150,
        October: 160,
        November: 130,
        December: 120,
        January: 160,
        February: 140,
        March: 90,
        April: 140,
        May: 130,
        June: 150,
        July: 140,
        August: 160,
      },
    },
    {
      code: '101010',
      name: 'Морозов Игорь Олегович',
      parentName: 'Морозов Олег Иванович',
      parentPhone: '+375 29 123 12 27',
      year: 1,
      left: false,
      rate: 150,
      months: {
        September: 160,
        October: 150,
        November: 120,
        December: 130,
        January: 160,
        February: 130,
        March: 90,
        April: 130,
        May: 120,
        June: 160,
        July: 130,
        August: 160,
      },
    },
  ];




  export const documents = [
    { id: 1, sender: 'Иванов Иван', receiver: 'Петров Петр', type: 'Заявление на отпуск', date: '10:15', status: 'Ждут подписи' },
    { id: 2, sender: 'Иванов Иван', receiver: 'Петров Петр', type: 'Счет на оплату', date: '11:30', status: 'Подписан' },
    { id: 3, sender: 'Иванов Иван', receiver: 'Петров Петр', type: 'Отчет о выполненной работе', date: '09:45', status: 'Отклонен' },
    { id: 4, sender: 'Петров Петр', receiver: 'Иванов Иван', type: 'Счет-фактура', date: '14:20', status: 'Ждут подписи' },
    { id: 5, sender: 'Петров Петр', receiver: 'Иванов Иван', type: 'Заявление на компенсацию', date: '16:55', status: 'Подписан' },
    { id: 6, sender: 'Петров Петр', receiver: 'Иванов Иван', type: 'Уведомление о собрании', date: '08:00', status: 'Ждут подписи' },
    { id: 7, sender: 'Сидоров Иван', receiver: 'Иванов Иван', type: 'Платежное поручение', date: '13:10', status: 'Отклонен' },
    { id: 8, sender: 'Сидоров Иван', receiver: 'Иванов Иван', type: 'Приказ о назначении', date: '12:25', status: 'Ждут подписи' },
    { id: 9, sender: 'Сидоров Иван', receiver: 'Иванов Иван', type: 'Заявление на материальную помощь', date: '10:50', status: 'Отправлен' }
  ];
  
  function getSentDocuments(person: string) {
    return documents.filter(doc => doc.sender === person);
  }
  
  function getReceivedDocuments(person: string) {
    return documents.filter(doc => doc.receiver === person);
  }
  
  // Пример использования функций
  const sender = 'Иванов Иван';
  const receiver = 'Петров Петр';
  
  const sentDocuments = getSentDocuments(sender);
  const receivedDocuments = getReceivedDocuments(receiver);
  
  console.log(`${sender} отправил следующие документы:`);
  console.log(sentDocuments);
  
  console.log(`${receiver} получил следующие документы:`);
  console.log(receivedDocuments);