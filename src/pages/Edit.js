import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  console.log(searchParams);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다</p>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <button onClick={() => navigate("/new")}>NEW 가기</button>

      <button onClick={() => setSearchParams({ key: 1 })}>sdfsd</button>
      {id}
      {mode}
    </div>
  );
};

export default Edit;
