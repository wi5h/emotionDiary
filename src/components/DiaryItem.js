import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  // 전달받은 date 밀리세컨즈를 데이트 객체로 변환, date가 문자열을 가질수도 있기에 parseInt사용

  const goDetail = () => {
    navigate(`/diary/${id}`); //클릭하는 일기의 상세페이지로 이동
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion-img-wrapper",
          `emotion-img-wrapper-${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info-wrapper">
        <div className="diary-date">{strDate}</div>
        <div className="diary-content-preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn-wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};
export default DiaryItem;
