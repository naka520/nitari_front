import { useEffect, useState } from "react";
import liff from "@line/liff";
import Home from './home';
import { Routes, Route, Link, useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import '../index.css';
import Replicate from "replicate";

function Day() {
  const { yyyymmdd } = useParams();
  const [searchParams] = useSearchParams();
  // const userId = searchParams.get("userId");
  const liffId = import.meta.env.VITE_LIFF_ID;
  const replicate = new Replicate({
    auth: import.meta.env.VITE_REPLICATE_TOKEN,
  });

  const [isLogined, setIsLogined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dayData, setDayData] = useState(null);
  const [userId, setUserId] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  // yyyymmdd の値を使用してページの内容を動的に変更することができます

  useEffect(() => {
    liff.init({
        liffId: liffId, // 環境変数からLIFF IDを取得
      })
      .then(() => {

        // 既にログインしているか確認
        if (liff.isLoggedIn()) {
          console.log("User already logged in");
          setIsLogined(true);
        }

        // get liff user profile
        liff.getProfile()
          .then((profile) => {
            console.log(profile);
            console.log(profile.userId);
            console.log(profile.displayName);
            console.log(profile.pictureUrl);
            console.log(profile.statusMessage);
            setUserId(profile.userId);

            // axios version (curl -X GET "https://func-backend.azurewebsites.net/api/diary?userId=Ua83ada9d0ba5343ce9bd2025195655f7&date={yyyymmdd}" -H  "accept: application/json")
            axios.get(`https://func-backend.azurewebsites.net/api/diary?userId=${profile.userId}&date=${yyyymmdd}`, {
              headers: {
                'accept': 'application/json',
              }
            })
            .then((response => {
              console.log(response)
              setDayData(response.data);
              setIsLoading(false);
            }))
            .catch((error) => {
              console.error(error)
            });
          })
          .catch((err) => {
            console.log('error', err);
          });
      })
      .catch((e) => {
      console.log("LIFF init failed.", e);
      });
  }, []); // useEffect内の処理はコンポーネントのマウント時に1回だけ実行

  const generateImage = async () => {
    try{
      // const output = await replicate.run(
      //   "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      //   {
      //     input: {
      //       prompt: dayData.description,
      //       width: 512,
      //       height: 512,
      //     }
      //   }
      // );

      const output = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
          input: {
            prompt: "a vision of paradise. unreal engine"
          }
        }
      );
      console.log(output);
      setGeneratedImage(output);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {
        isLoading ? (
          <div
            className="flex items-center justify-center h-screen w-screen"
          >Loading...</div>
        ) : (
          <div className="BackColor">
            <h1>Day: {yyyymmdd}</h1>
            <h2>userId: {userId}</h2>

            {/* async functions button */}
            <button 
              // onClick={() => generateImage()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Image
            </button>
            <h2>dayData: {dayData.description}</h2>

          </div>
        ) 
      }
    </>
  );
}

export default Day;


