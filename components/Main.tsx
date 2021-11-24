import { FC } from "react";
import s from "./main.module.css";
import MicIcon from "./MicIcon";

const Main: FC = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.ai_said}>
        안녕하세요, <br />
        분석할 사진을 선택하시겠어요?
      </h1>
      <div className={s.btn_wrap}>
        <div className={s.right_background_circle} />
        <div className={s.left_background_circle} />
        <button className={s.mic_btn}>
          <MicIcon />
        </button>
      </div>
    </div>
  );
};

export default Main;
