import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/CustomHeader";
import axios from "axios";
import '../index.css';

const ThisWeek = () =>{
  const mockData = [
    { img: "/path/to/image1.jpg", title: "眠いんご", date: "20230901", chatGPTOutput: "ワークショップの後に参加者たちとディナーを共にしました。長時間の開発セッションの後だったので、皆でリラックスして気楽に話す時間は本当に貴重でした。食事をしながら他のチームの進捗や、出会った困難について話し合いました。それぞれのチームが選んだアプローチ方法について話を聞き、私たちのプロジェクトにも役立つ新たな視点を得ることができました。" },
    { img: "/path/to/image2.jpg", title: "大濠公園", date: "20230902", chatGPTOutput: "成果発表会で最も印象的だったのは、各チームが開発期間中にどれだけ進化し、改善したかを見ることでした。他のチームのプレゼンテーションを見て、自分たちのプロジェクトにも取り入れたいいくつかのアイデアを見つけることができました。" },
    { img: "/path/to/image3.jpg", title: "インコ", date: "20230903", chatGPTOutput: "他のチームのプロジェクト発表を聞いて、私たちのチームも採用できるいくつかの新しいテクニックやツールに気づきました。特にデータ可視化ツールの使用方法に関するセッションは、今後のプロジェクトで非常に役立つと感じました。" },
    { img: "/path/to/image4.jpg", title: "ハッカソン", date: "20230904", chatGPTOutput: "成果発表会の後、他の参加者と一緒にカフェで落ち着いて話をしました。そこで、私たちのプロジェクトが直面していたいくつかの技術的な問題に関する有用なフィードバックと提案を受け取ることができました。" },
    { img: "/path/to/image5.jpg", title: "卒業研究", date: "20230905", chatGPTOutput: "ハッカソンの終了後、チームメンバーと一緒に反省会を開きました。そこで、他のチームの強みと弱みを分析し、私たちのチームがどのように改善できるかについて議論しました。それが非常に有益なセッションとなり、次に向けての新たなアイデアと目標が生まれました。" },
    { img: "/path/to/image6.jpg", title: "旅行", date: "20230906", chatGPTOutput: "成果発表会では、他のチームがどのように問題を解決したのかを学ぶことができました。その過程で、自分たちのプロジェクトに関しても新たな解決策や改善点が見えてきました。" },
    { img: "/path/to/image7.jpg", title: "デザートブッフェ", date: "20230907", chatGPTOutput: "ハッカソンで他のチームのアプローチを見て、私たちのプロジェクトでも試してみたいいくつかの新しい技術や方法を見つけました。特に新しいプログラム言語やフレームワークに関する情報は、今後のプロジェクトでの実装を非常に楽しみにしています。" },
  ];

  return(
    <div className="BackColor flex flex-col min-h-screen h-auto w-screen">
    <Header />
    <div className="flex items-center justify-between pl-6 pr-4">
      <h2 className="myFont text-4xl mb-8 lg:mb-0 font-bold">今週の日報</h2>
    </div>
    <div className="flex flex-col items-center">
      {mockData.map((report, idx) => (
        <div key={idx} className="bg-white shadow-lg rounded p-4 mb-4 w-full max-w-md">
          <div className="flex items-center space-x-4">
            <img className="w-32 h-32 object-cover rounded" src={report.img} alt={report.title} />
            <div className="ml-12">
              <h3 className="font-bold text-xl mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-2 ">{report.date}</p>
            </div>
          </div>
          <p className="text-sm mt-2">{report.chatGPTOutput}</p>
        </div>
      ))}
    </div>
  </div>
  );
}
export default ThisWeek;
