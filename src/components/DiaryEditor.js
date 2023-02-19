import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App";

import MyButton from ".//MyButton";
import EmotionItem from "./EmotionItem";
import MyHeader from "./MyHeader";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `../assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `../assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `../assets/emotion3.png`,
    emotion_descript: "그냥저냥",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `../assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `../assets/emotion5.png`,
    emotion_descript: "완전 나쁨",
  },
];

export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");

  const [emotion, setEmotion] = useState(3);
  //기본 선택 감정 3번감정
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion); // 클릭한 감정(emotion_id)으로 state 변경
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus(); // 한 글자도 안 썼을때 textarea에 포커스.
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠어요?" : "새로운 일기를 작성하시겠어요?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true }); // 일기 작성 후, 뒤로가기로 다시 못돌아오게 함
  };

  useEffect(() => {
    if (isEdit) {
      // new에서 렌더하는 DiaryEditor가 아니라 Edit에서 렌더하는 DiaryEditor
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        // useNavigate로 뒤로가기 이동
      />
      <div>
        <section>
          <h4>오늘은 며칠인가요?</h4>
          <div className="input-box">
            <input
              className="input-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input-box emotion-list-wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input-box text-wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루는 어땠나요?"
            />
          </div>
        </section>
        <section>
          <div className="control-box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;
