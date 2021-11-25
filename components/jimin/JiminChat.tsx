import s from "./jimin.module.css";

export default function JiminChat({ content }: any) {
  return (
    <div className={s.jimin_chat_area}>
      <div className={s.profile}>
        <img src="https://w.namu.la/s/b723f753f57d2abaf00ae2fc6e5ba2e5214217aa92ba26be148e45c1a9cc7fcd8d82c4fe263a9c2f90c95e571966e3633ebfbf33b6abef0769a2e33d575a9657e1044fc1f938c1cb15ccb872a179db8aad66d6024fa8e7d67555413fbb37435b" />
        <span>지민이</span>
      </div>
      <div className={s.area}>
        <span className={s.jimin_chat_box}>{content}</span>
      </div>
    </div>
  );
}
