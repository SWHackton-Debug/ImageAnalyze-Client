import { FC, useEffect, useState } from "react";
import s from "./main.module.css";
import MicIcon from "./MicIcon";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Spiner from "./Spiner";
import { getImgData, openTextFile } from "./function";

const Main: FC = () => {
  const [aiSpeack, setAiSpeack] =
    useState<string>("분석할 사진을 선택하시겠어요?");
  const [isMicOn, setIsMicOn] = useState<Boolean>(false);
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
          getImgData(res.file).then((res) => {
            const imgData: any[] =
              res.data.responses[0].localizedObjectAnnotations;
            let objCollectText = "";
            imgData.forEach(({ name }, index) => {
              objCollectText += " " + name;
              if (imgData.length - 1 === index) {
                setAiSpeack(`이 사진 속엔 ${objCollectText} 등이 있네요`);
              }
              console.log(name);
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
      <div className={s.btn_wrap}>
        {!isMicOn && (
          <>
            <div className={s.right_background_circle} />
            <div className={s.left_background_circle} />
          </>
        )}
        <button className={s.mic_btn} onClick={isMicOn ? stopListen : listen}>
          {isMicOn ? <Spiner size={50} /> : <MicIcon />}
        </button>
      </div>
    </div>
  );
};

export default Main;
