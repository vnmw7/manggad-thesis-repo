import React from 'react';

interface Item {
  id: number;
  title: string;
  label: string;
}

const Carousel: React.FC = () => {
  const items: Item[] = [
    { id: 1, title: "Thesis Title 1", label: "SBIT Department" },
    { id: 2, title: "Thesis Title 2", label: "SLATE Department" },
    { id: 3, title: "Thesis Title 3", label: "SARFAID Department" },
    { id: 4, title: "Thesis Title 4", label: "SHTM Department" },
    { id: 5, title: "Thesis Title 5", label: "Label 5" },
  ];

  return (
    <div className="relative ml-0" style={{ marginTop: '490px' }}>
      <h1 className="text-2xl font-bold text-center mb-4 ml-3" style={{ textAlign: 'left' }}>Recommended</h1>
      
      <div className="relative -mt-5 -ml-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {items.map(item => (
            <div
              key={item.id}
              className="p-4 h-52 bg-white shadow-md rounded-lg cursor-pointer"
              style={{ textAlign: 'left' }}
            >
              <h2 className="text-xl">{item.title}</h2>
              <span className="text-sm text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
        
        <span
          className="absolute top-4 right-4 text-blue-500 cursor-pointer"
          onClick={() => {
            // Handle "View More" action here
            console.log('View More clicked');
          }}
        >
          View More
        </span>
      </div>
    </div>
  );
};

export default Carousel;
