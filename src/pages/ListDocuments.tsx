import React, { useState } from 'react';
import TabMenu from './TabMenu';
import DocumentList from './DocumentList';
import { documents } from './data';

const ListDocuments: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Все');

   
  
    const filteredDocuments = documents.filter((doc) => {
      if (activeTab === 'Все') return true;
      if (activeTab === 'Важные') return doc.status === 'Важные';
      if (activeTab === 'Удаленные') return doc.status === 'Удаленные';
      if (activeTab === 'Ждут подписи') return doc.status === 'Ждут подписи';
      if (activeTab === 'Подписанные') return doc.status === 'Подписанные';
      if (activeTab === 'Отправленные') return doc.status === 'Отправлен';
      return true;
    });
  
    return (
      <div className="p-4">
          <h2>Список documents</h2>
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <DocumentList documents={filteredDocuments} />
      </div>
    );
    // return (
    //     <div>
    //       
    //         </h2>
    //         {/* Добавьте здесь содержимое страницы */}
    //     </div>
    // );
}

export default ListDocuments;
