import { useRouter } from "next/dist/client/router";
import s from "./jimin.module.css";

export default function Jimin() {
  const router = useRouter();
  return (
    <div className={s.wrapper}>
      <img
        src="https://naverbooking-phinf.pstatic.net/20201109_3/1604912248131Q1Jj0_JPEG/01D8EDAB-5079-44F2-8366-DDB6984E259B.jpeg?type=f804_408_60_sharpen"
        className={s.jimin_profile}
      />
      <p className={s.jimin_description}>
        안녕하세요! <br /> 인공지능 상담사 <b>지민이</b> 입니다! <br /> 언제든지
        편하게 상담해주세요~~
      </p>
      <button
        className={s.entrance_btn}
        onClick={() => router.push("/jimin/chating")}
      >
        <b>지금 대화 시작하기</b> 🖐
      </button>
    </div>
  );
}
