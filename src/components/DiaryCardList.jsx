import React from 'react';
import DiaryCard from './DiaryCard';

const DiaryCardList = ({ data }) => {
    return (
        <>
            { data !== null ? (
                <>
                    {data.map((item, index) => (
                        <DiaryCard
                            key={index}  // keyを追加
                            date={item.date}
                            detail={item.description}
                        />
                    ))}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default DiaryCardList;
