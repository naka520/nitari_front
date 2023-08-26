import React from 'react';
import DiaryCard from './DiaryCard';

function DiaryCardList() {
    return (
    <div>
        <DiaryCard
        className="border"
        date="2023-08-27"
        imageUrl="https://example.com/image.jpg"
        title="サンプルタイトル"
        detail="これは詳細です。"
        />
    </div>
    );
}

export default DiaryCardList;