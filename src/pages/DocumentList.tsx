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
import { saveAs } from 'file-saver'
import { PDFDocument } from 'pdf-lib';
import Modal from 'react-modal'
import axios from 'axios';
import { error } from 'console';
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

const DocumentList: React.FC<DocumentListProps> = ({ documentes, onDelete }) => {

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<Document | null>(null);
    const [signature, setSignature] = useState<File | null>(null);
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

    const handleSignDocument = async (file: Document) => {
        if (file.status !== 'Ждет подписи') {
            alert('Этот документ не требует подписи.');
            return;
        }

        if (file?.file?.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = async (e) => {
                setPdfBytes(new Uint8Array(e.target!.result as ArrayBuffer));
                setSelectedFile(file);
                setIsModalOpen(true);
            };
            fileReader.readAsArrayBuffer(file.file);
        }
    };

    const handleSignPDF = async () => {
        if (!selectedFile || !signature || !pdfBytes) return;

        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const signatureImageBytes = await signature.arrayBuffer();

        try {
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            // Определяем тип изображения подписи
            let signatureImage;
            if (signature.type === 'image/png') {
                signatureImage = await pdfDoc.embedPng(signatureImageBytes);
            } else if (signature.type === 'image/jpeg') {
                signatureImage = await pdfDoc.embedJpg(signatureImageBytes);
            }
            // } else if (signature.type === 'image/svg'){
            //     signatureImage = await pdfDoc.embed(signatureImageBytes);
            // }
            // const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
            if (signatureImage) {
                firstPage.drawImage(signatureImage, {
                    x: 50,
                    y: 50,
                    width: 150,
                    height: 50,
                });


                const signedPdfBytes = await pdfDoc.save();
                const signedBlob = new Blob([signedPdfBytes], { type: 'application/pdf' });
                saveAs(signedBlob, `signed-${selectedFile?.file?.name}`);
            }
        }
        catch (error) {
            console.error('Ошибка при подписании документа', error)
        }

        await updateFileStatusInDatabase(selectedFile.id);

        setIsModalOpen(false);
    };


    const updateFileStatusInDatabase = async (fileId: number) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const response = await axios.put(
                ` /api/update-file-status/${fileId}`,
                { status: 'Подписанный' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 401) {
                const newAccessToken = await refreshTokenFunction(refreshToken!);
                localStorage.setItem('accessToken', newAccessToken);
                await updateFileStatusInDatabase(fileId);
            }
            console.log('Статус файла успешно обновлен:', response.data);
        } catch (error) {
            console.error('Ошибка при обновлении статуса файла:', error);
        }
    };

    const refreshTokenFunction = async (refreshToken: string): Promise<string> => {
        const response = await axios.post('/api/refresh-token', { token: refreshToken });
        return response.data.accessToken;
    };






    //-----------------------------------
    const handleView = (file: File | null) => {
        if (file) {
            if (file.size === 0) {
                alert('Файл пустой')
            }
            else {
                const url = URL.createObjectURL(file);
                window.open(url, '_blank');
            }
        } else {
            alert('Файл не найден');
        }
    };

    const handleDownload = (file: File | null) => {
        if (file) {

            saveAs(file, file.name);
        } else {
            alert('Файл не найден');
        }
    };

    const handleDeleteClick = () => {
        onDelete(selectedIds);
        setSelectedIds([]);
    };

    const columns: GridColDef[] = [
        //   { field: 'checkbox', headerName: '', width: 100, renderCell: (params) => <input type="checkbox" checked={selectedIds.includes(params.row.id)} onChange={() => handleCheckboxChange(params.row.id)} />, sortable: false },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'sender', headerName: 'Отправитель', width: 200 },
        { field: 'receiver', headerName: 'Получатель', width: 200 },
        { field: 'type', headerName: 'Тип документа', width: 200 },
        { field: 'date', headerName: 'Дата', width: 150 },
        { field: 'status', headerName: 'Статус', width: 150 },
        {
            field: 'actions',
            headerName: 'Действия',
            width: 150,
            renderCell: (params) => (
                <div>
                    <button onClick={() => handleView(params.row.file)}>Просмотр</button>
                    <button onClick={() => handleDownload(params.row.file)}>Скачать</button>
                </div>
            ),
        },
        {
            field: 'sign',
            headerName: 'Подпись',
            width: 160,
            renderCell: (params) => (
                <button onClick={() => handleSignDocument(params.row as Document)}>
                    Подписать
                </button>
            ),
        },
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
                // onRowSelectionModelChange={handleSelectionChange}

                />
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>Подписание документа</h2>
                {selectedFile && selectedFile?.file?.type === 'application/pdf' ? (
                    <div>
                        <embed src={URL.createObjectURL(selectedFile.file)} width="600" height="400" type="application/pdf" />
                        <input type="file" accept="image/*" onChange={(e) => setSignature(e.target.files?.[0] || null)} />
                        <button onClick={handleSignPDF}>Подписать</button>
                    </div>
                ) : (
                    <p>Только форматы PDF поддерживаются.</p>
                )}
            </Modal>
        </div>
    );
};

export default DocumentList;