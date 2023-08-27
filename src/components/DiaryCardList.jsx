import React from 'react';
import DiaryCard from './DiaryCard';
import { useEffect } from 'react';

const DiaryCardList = ({ data }) => {

    return (
        <>
            {data.map((item, index) => (
                <DiaryCard
                className="border"
                date={item.date}
                detail={item.description}
                />
            ))}
        </>
    );
};


export default DiaryCardList;
