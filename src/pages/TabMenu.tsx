// import clsx from 'clsx';
// import React from 'react';

// interface TabMenuProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// const TabMenu: React.FC<TabMenuProps> = ({ activeTab, setActiveTab }) => {
//   const tabs = ['Все', 'Важные',  'Ждут подписи', 'Подписанные', 'Отправленные','Удаленные',];

//   return (
//     <div className="flex space-x-4 border-b mb-4">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           className={clsx('py-2 px-4',` ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : ''}`)}
//           onClick={() => setActiveTab(tab)}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default TabMenu;
import clsx from 'clsx';
import React from 'react';

interface MenuTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabMenu: React.FC<MenuTabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Все', 'Важные', 'Ждет подписи', 'Подписанные', 'Отправленные', 'Удаленные'];

  return (
    <div className="flex space-x-4 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={clsx('py-2 px-4',` ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : ''}`)}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;