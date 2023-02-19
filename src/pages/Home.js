import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import DiaryList from "../components/DiaryList";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      setData(() => []);
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter(
          (it) => firstDay <= parseInt(it.date) && parseInt(it.date) <= lastDay
        )
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
