import { FC, useEffect, useState } from "react";
import s from "./main.module.css";
import MicIcon from "./MicIcon";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Spiner from "./Spiner";
import { getImgData, openTextFile } from "./function";
import axios from "axios";

const Main: FC = () => {
  const [aiSpeack, setAiSpeack] =
    useState<string>("분석할 사진을 선택하시겠어요?");
  const [isMicOn, setIsMicOn] = useState<Boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const { transcript, resetTranscript } = useSpeechRecognition();

  const listen = () => {
    setIsMicOn(true);
    SpeechRecognition.startListening();
  };

  const stopListen = () => {
    setIsMicOn(false);
    SpeechRecognition.stopListening();
  };

  const speachText = (text: string) => {
    const speach = new SpeechSynthesisUtterance();
    speach.rate = 1.5;
    speach.pitch = 1.5;
    speach.volume = 1;
    speach.lang = "ko-KR";
    speach.text = text;
    speechSynthesis.speak(speach);
  };

  useEffect(() => {
    if (isMicOn) return;
    if (transcript.includes("사진")) {
      if (transcript.includes("업로드")) {
        speachText("사진을 선택해주세요");
        openTextFile().then((res) => {
          setPreviewUrl(res.preview);
          getImgData(res.file).then((res) => {
            const imgData: any[] =
              res.data.responses[0].localizedObjectAnnotations;
            let objCollectText = "";
            if (imgData == undefined) {
              setAiSpeack(
                `이 사진 속에 검출된 것이 없습니다`
              );
              throw '';
            }
            imgData.forEach(({ name }, index) => {
              setTimeout(() => {
                axios({
                  method: "post",
                  url: "http://118.67.129.142:3000/translate",
                  data: {
                    source: "en",
                    target: "ko",
                    text: name,
                  },
                }).then((res) => {
                  const text = res.data.message.result.translatedText;
                  if (imgData.length - 1 === index) {
                    setTimeout(() => {
                      objCollectText += text + " ";
                      setAiSpeack(
                        `이 사진 속엔 ${objCollectText} 등이 있습니다`
                      );
                    }, 100);
                  } else {
                    objCollectText += text + ", ";
                  }
                });
              }, 100);
            });
          });
        });
      }
    }
    resetTranscript();
    setIsMicOn(false);
  }, [isMicOn]);

  useEffect(() => {
    speachText(aiSpeack);
  }, [aiSpeack]);

  return (
    <div className={s.wrapper}>
      <h1 className={s.ai_said}>{aiSpeack}</h1>
      <div className={s.btn_wrap} onClick={isMicOn ? stopListen : listen}>
        {!isMicOn && (
          <>
            <div className={s.right_background_circle} />
            <div className={s.left_background_circle} />
          </>
        )}
        <button className={s.mic_btn}>
          {isMicOn ? <Spiner size={50} /> : <MicIcon />}
        </button>
      </div>
      {previewUrl && <img className={s.preview} src={previewUrl} />}
    </div>
  );
};

export default Main;
