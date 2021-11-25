import s from "./jimin.module.css";

export default function UserChat({ content }: any) {
  return (
    <div className={s.my_chat_area}>
      <span className={s.my_chat}>{content}</span>
    </div>
  );
}
