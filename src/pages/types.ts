export const monthNamesEnToRu: Record<string, string> = {
    September: 'Сентябрь',
    October: 'Октябрь',
    November: 'Ноябрь',
    December: 'Декабрь',
    January: 'Январь',
    February: 'Февраль',
    March: 'Март',
    April: 'Апрель',
    May: 'Май',
    June: 'Июнь',
    July: 'Июль',
    August: 'Август',
  };


  
  export interface Document {
    id: number;
    sender: string;
    // senderEmail: string;
    receiver: string;
    // receiverEmail: string;
    type: string;
    date: string;
    status: string;
  }
  export const tabToStatusMap: { [key: string]: string } = {
    'Все': '',
    'Важные': 'Важные',
    'Ждет подписи': 'Ждет подписи',
    'Подписанные': 'Подписан',
    'Отправленные': 'Отправлен',
    'Удаленные': 'Удален',
  };