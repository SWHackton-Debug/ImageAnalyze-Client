import s from "./jimin.module.css";
import JiminChat from "./JiminChat";
import UserChat from "./UserChat";
import { useState, useEffect } from "react";

interface chatArrObj {
  type: "jimin" | "user";
  content: string;
}

export default function JiminChating() {
  const [myChat, setMyChat] = useState<string>("");
  const [chatArr, setChatArr] = useState<chatArrObj[]>([
    {
      type: "jimin",
      content: "안녕하세요!",
    },
  ]);
  const handleInput = ({ target }: any) => {
    setMyChat(target.value);
  };
  const subChat = (event: any) => {
    if (event.keyCode !== 13) return;
    setChatArr((arr) => [
      ...arr,
      {
        type: "user",
        content: myChat,
      },
    ]);
    setTimeout(() => {
      if (myChat === "안녕") {
        setChatArr((arr) => [
          ...arr,
          {
            type: "jimin",
            content: "무엇을 도와드릴까요?",
          },
        ]);
      }
      if (myChat === "나 요즘 우울해") {
        setChatArr((arr) => [
          ...arr,
          {
            type: "jimin",
            content: "요즘 외로우시군요.. 노래를 추천드릴까요?",
          },
        ]);
      }
      if (myChat === "추천해줘") {
        setChatArr((arr) => [
          ...arr,
          {
            type: "jimin",
            content: "브레이브걸스의 '롤린'을 들어보세요!",
          },
        ]);
      }
      if (myChat === "좋아") {
        setChatArr((arr) => [
          ...arr,
          {
            type: "jimin",
            content: "별말씀을요",
          },
        ]);
      }
      setMyChat("");
    }, 500);
  };
  useEffect(() => {
    const chat_area: any = document.getElementById("chat_area");
    chat_area.scrollTop = chat_area.scrollHeight;
  }, [chatArr]);
  return (
    <div className={s.wrapper}>
      <div className={s.chat_container}>
        <div className={s.chating_area} id="chat_area">
          <p className={s.chat_intro}>
            안녕하세요 인공지능 상담사 영실이 입니다 <br /> 대화를 시작해보세요
            <br />
            <br />
            <span>명령어 ex) 오늘 기분 어때?</span>
          </p>
          {chatArr.map((chat, index) => (
            <div key={index}>
              {chat.type === "jimin" ? (
                <JiminChat content={chat.content} />
              ) : (
                <UserChat content={chat.content} />
              )}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="대화를 입력하세요!"
          value={myChat}
          onChange={handleInput}
          onKeyDown={subChat}
        />
      </div>
    </div>
  );
}
