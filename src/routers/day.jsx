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
  const [isCreating, setIsCreating] = useState(false);
  const [dayData, setDayData] = useState(null);
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
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

              // get access token
              try {
                const value = liff.getAccessToken()
                setAccessToken(value);
                setIsLoading(false);
              } catch (error) {
                console.error(error)
                setIsLoading(false);
              }

            }))
            .catch((error) => {
              console.error(error)
              setIsLoading(false);
            });
          })
          .catch((err) => {
            console.log('error', err);
            setIsLoading(false);
          });
      })
      .catch((e) => {
        console.log("LIFF init failed.", e);
        setIsLoading(false);
      });
  }, []); // useEffect内の処理はコンポーネントのマウント時に1回だけ実行

  async function generateImage() {
    let output;
    setIsCreating(true);
    // generate image by api
    console.log("start generating image");
    try{
      // prompt: dayData.description,
      // const response = await axios.post(`http://localhost:7071/api/CreateImage`, {
      const response = await axios.post(`/api/CreateImage`, {
        prompt: dayData.description,
      });
      output = response.data;
      console.log(response.data);
      console.log("image was generated");
      setIsCreating(false);
      setGeneratedImage(response.data);
    } catch (error) {
      console.error(error)
      console.error("image was not generated");
    }

    // upload imageUrl by api
    // axios version curl -X PATCH "https://func-backend.azurewebsites.net/api/diary/imageurl" -H  "accept: application/json" -H  "Authorization: eyJhbGciOiJIUzI1NiJ9.8yFBfwz1d6XoHf0MXes0QAnbpMsh9OhqJsnboMh7xfZdBXzuVQbJG2e30rRxsSH3oNApfzutiovGaVhMWWqhIMOolBBL8ttX9KKLVZ_xBIcIizfBChUjoKVAmYdYg0o8MMJt54OIlDjSIWjjgHkOgZqsoX4G6RMecxguC2gJHdY.tBspVz3BDlcEg5rJiKufCdoz-CgZdVnmuR_Js4gNh4I" -H  "Content-Type: application/json" -d "{  \"userId\": \"Ua83ada9d0ba5343ce9bd2025195655f7\",  \"date\": \"20230909\",  \"imageUrl\": \"https://pbxt.replicate.delivery/so4COhOfJ2UuByiErWfPYvX66slhZWgBeBFm5NwpIo6qlJFjA/out-0.png\"}"
    try {
      await axios.patch(`https://func-backend.azurewebsites.net/api/diary/imageurl`, {
        userId: userId,
        date: yyyymmdd,
        imageUrl: output[0],
      }, {
        headers: {
          'accept': 'application/json',
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        }
      });
      console.log("image url was uploaded");
      setGeneratedImage(output[0]);
    } catch (error) {
      console.error(error)
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
            <div
              className="text-2xl text-center font-bold mb-4"
            >
              日付: {dayData.title}
            </div>
            <div
              className="text-2xl text-center font-bold mb-4"
            >
              タイトル: {dayData.date}
            </div>

            {/* async functions button */}
            {
              (dayData.imageUrl === null || dayData.imageUrl === "") ? (
                <div
                  className="flex items-center justify-center h-full w-full mb-8"
                >
                  {
                    isCreating ? (
                      <div
                        className="flex items-center justify-center h-full w-full text-2xl text-center font-bold"
                      >
                        Creating...
                      </div>
                    ) : (
                      <>
                        {
                          generatedImage !== null ? (
                            <>
                              <img
                                src={generatedImage}
                                alt="generatedImage"
                                className="w-1/2 h-1/2"
                              />
                            </>
                          ) : (
                            <>
                              <div
                                className="flex items-center justify-center h-full w-full text-2xl text-center font-bold"
                              >
                                {/* display src/no-image.jpg by relative path */}
                                <img
                                  src="../src/no-image.jpg"
                                  alt="no-image" 
                                  className="w-1/2 h-1/2"
                                />
                                <button 
                                  onClick={() => generateImage()}
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
                                >
                                  作成
                                </button>
                              </div>
                            </>
                          )
                        }
                      </>
                    )
                  }
                </div>
              ) : (
                <div
                  className="flex items-center justify-center h-full w-full mb-8"
                >
                  <img
                    src={dayData.imageUrl}
                    alt="imageUrl" 
                    className="w-1/2 h-1/2 shadow-xl"
                  />
                  <div
                    className=""
                  >
                    {/* <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
                    >
                      共有する
                    </button> */}
                    <button
                      onClick={() => generateImage()}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
                    >
                      再生成
                    </button>
                  </div>
                </div>
              )
            }
            
            <div
              className="text-center mb-4 h-full w-full justify-center items-center flex"
            >
              <div
                className="h-3/4 w-3/4 text-xl font-medium text-center mb-8"
              >
                日記: {dayData.description}
              </div>
            </div>

          </div>
        ) 
      }
    </>
  );
}

export default Day;
