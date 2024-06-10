import React from 'react';

interface Document {
  id: number;
  sender: string;
  receiver: string;
  type: string;
  date: string;
  status: string;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ФИО</th>
            <th className="py-2 px-4 border-b">Тип документа</th>
            <th className="py-2 px-4 border-b">Дата</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="py-2 px-4 border-b">{doc.sender}</td>
              <td className="py-2 px-4 border-b">{doc.type}</td>
              <td className="py-2 px-4 border-b">{doc.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList