// import React, { useState } from 'react';
// import TabMenu from './TabMenu';
// import DocumentList from './DocumentList';
// import { documents,Document } from './data';


// const ListDocuments: React.FC = () => {
//     const [activeTab, setActiveTab] = useState('Все');
//     const [documents,sentDocuments]=useState<Document[]>([])

   
  
//     const filteredDocuments = documents.filter((doc) => {
//       if (activeTab === 'Все') return true;
//     //   if (activeTab === 'Важные') return doc.status === 'Важные';
//     //   if (activeTab === 'Удаленные') return doc.status === 'Удаленные';
//     //   if (activeTab === 'Ждут подписи') return doc.status === 'Ждут подписи';
//     //   if (activeTab === 'Подписанные') return doc.status === 'Подписанные';
//     //   if (activeTab === 'Отправленные') return doc.status === 'Отправлен';
//     //   return true;
//     return doc.status === activeTab;
//     });
  
//     return (
//       <div className="p-4">
//           <h2>Список documents</h2>
//         <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
//         <DocumentList documents={filteredDocuments} />
//       </div>
//     );
//     // return (
//     //     <div>
//     //       
//     //         </h2>
//     //         {/* Добавьте здесь содержимое страницы */}
//     //     </div>
//     // );
// }

// export default ListDocuments;

// ///222222
// import React, { useState } from 'react';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import TabMenu from './TabMenu'; // Предполагаем, что у вас есть компонент TabMenu для управления вкладками

// interface Document {
//   id: number;
//   senderName: string;
//   senderEmail: string;
//   receiverName: string;
//   receiverEmail: string;
//   type: string;
//   date: string;
//   status: string;
// }

// interface ListDocumentsProps {
//   documents: Document[];
// }

// const ListDocuments: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('Все');

//   // Функция для фильтрации документов по статусу
//   const filteredDocuments = documents.filter((doc) => {
//     if (activeTab === 'Все') return true;
//     return doc.status === activeTab;
//   });

//   // Колонки для DataGrid
//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'senderName', headerName: 'Отправитель', width: 200 },
//     { field: 'receiverName', headerName: 'Получатель', width: 200 },
//     { field: 'type', headerName: 'Тип документа', width: 200 },
//     { field: 'date', headerName: 'Дата', width: 150 },
//     { field: 'status', headerName: 'Статус', width: 150 },
//   ];

//   return (
//     <div className="p-4">
//       <h2>Список документов</h2>
//       <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid rows={filteredDocuments} columns={columns} autoPageSize={true} sortingOrder={['asc', 'desc']} />
//       </div>
//     </div>
//   );
// };

// export default ListDocuments;



/////333333
import React, { useEffect, useState } from 'react';

import { Document, tabToStatusMap } from './types';
import TabMenu from './TabMenu';
import DocumentList from './DocumentList';
import { documents } from './data';
import axios from 'axios';

const ListDocuments: React.FC = () => {
  
    const [activeTab, setActiveTab] = useState('Все'); // Активная вкладка
    const [docs, setDocuments] = useState<Document[]>(documents);
    const [accessToken, setAccessToken] = useState<string>(() => localStorage.getItem('accessToken') || '');
    const [refreshToken, setRefreshToken] = useState<string>(() => localStorage.getItem('refreshToken') || '');
  
    useEffect(() => {
      // Проверяем, есть ли токены в localStorage
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
  
      if (storedAccessToken && storedRefreshToken) {
        debugger;
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      }
    }, []);
  
    const handleDelete = async (selectedIds: number[]) => {
      try {
        const response = await axios.delete(
          'https://your-api-url/delete-documents',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: {
              documentIds: selectedIds,
            },
          }
        );
  
        console.log('Ответ сервера:', response.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };
  
    const refreshAccessToken = async () => {
      try {
        const refreshResponse = await axios.post(
          'https://your-api-url/refresh-token',
          {
            refreshToken: refreshToken,
          }
        );
  
        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
      } catch (refreshError) {
        console.error('Ошибка при обновлении токена:', refreshError);
      }
    };


//   const filteredDocuments = docs.filter(doc => {
//     if (activeTab === 'Все') return true;
//     return doc.status === activeTab;
//   });
  const filteredDocuments = docs.filter(doc => {
    const status = tabToStatusMap[activeTab];
    if (!status) return true; // Если статус пустой (для вкладки "Все"), возвращаем true
    return doc.status === status;
  });

  return (
    <div>
      <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <DocumentList documentes={filteredDocuments} onDelete={handleDelete} />
    </div>
  );
};

export default ListDocuments;