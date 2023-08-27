import React from 'react';

const DiaryCard = ({ date, imageUrl, title, detail }) => {
    return (
        <div className="bg-green-400 shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl hover:bg-gray-200">
            <div className="relative pb-2/3">
                <img className="absolute h-full w-full object-cover" src={imageUrl} alt={title} />
            </div>
            <div className="p-6">
                <h3 className="text-lg text-gray-900 font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-900">{detail}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-600">{date}</div>
                </div>
            </div>
        </div>
    );
};


export default DiaryCard;
