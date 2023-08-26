import React from 'react';

const DiaryCard = ({ date, imageUrl, title, detail }) => {
    return (
    <div className=" bg-red-400 border rounded-lg overflow-hidden">
        <div className="relative pb-48">
        <img className="absolute h-full w-full object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="p-4">
        <h3 className="text-lg bg-red-400 font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{detail}</p>
        <div className="text-xs text-gray-400">{date}</div>
        </div>
    </div>
    );
};

export default DiaryCard;
