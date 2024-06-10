// import React from 'react';

// interface Document {
//   id: number;
//   sender: string;
//   receiver: string;
//   type: string;
//   date: string;
//   status: string;
// }

// interface DocumentListProps {
//   documents: Document[];
// }

// const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">ФИО</th>
//             <th className="py-2 px-4 border-b">Тип документа</th>
//             <th className="py-2 px-4 border-b">Дата</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.map((doc) => (
//             <tr key={doc.id}>
//               <td className="py-2 px-4 border-b">{doc.sender}</td>
//               <td className="py-2 px-4 border-b">{doc.type}</td>
//               <td className="py-2 px-4 border-b">{doc.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DocumentList



import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Document } from './types';

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

interface DocumentListProps {
  documentes: Document[];
  onDelete: (selectedIds: number[]) => void
}

const DocumentList: React.FC<DocumentListProps> = ({ documentes,onDelete }) => {

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelectionChange = (selection: any) => {
      setSelectedIds(selection.selectionModel);
    };
    const handleDeleteClick = () => {
        onDelete(selectedIds);
        setSelectedIds([]);
      };
  
    const columns: GridColDef[] = [
      { field: 'checkbox', headerName: '', width: 100, renderCell: (params) => <input type="checkbox" checked={selectedIds.includes(params.row.id)} onChange={() => handleCheckboxChange(params.row.id)} />, sortable: false },
      { field: 'id', headerName: 'ID', width: 70 },
    { field: 'sender', headerName: 'Отправитель', width: 200 },
    { field: 'receiver', headerName: 'Получатель', width: 200 },
    { field: 'type', headerName: 'Тип документа', width: 200 },
    { field: 'date', headerName: 'Дата', width: 150 },
    { field: 'status', headerName: 'Статус', width: 150 },
  ];

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };


  return (
    <div className='flex flex-col w-full gap-[20px]'>
    <div style={{ marginBottom: '10px' }}>
            <button onClick={handleDeleteClick} disabled={selectedIds.length === 0}>Удалить выбранные документы</button>
          </div>
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={documentes}
        columns={columns}
        autoPageSize={true}
        // rowsPerPageOptions={[5, 10, 20]}
        sortingOrder={['asc', 'desc']}
        disableColumnFilter
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
      
      />
    </div>
    </div>
  );
};

export default DocumentList;