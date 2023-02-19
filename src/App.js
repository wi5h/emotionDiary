import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useReducer, useRef } from "react";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

export const DiaryStateContext = createContext(null);
export const DiaryDispatchContext = createContext(null);

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1676695418281,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1676695418282,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1676695418283,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1676695418284,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1676695418285,
  },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id
          ? {
              ...action.data,
            }
          : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(6);

  const onCreate = (date, content, emotion) => {
    const nowSavingDate = new Date(date);
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: nowSavingDate.getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    const nowSavingDate = new Date(date);
    nowSavingDate.setHours(12, 0, 0);

    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: nowSavingDate.getTime(),
        content,
        emotion,
      },
    });
  };

  const dispatches = {
    onCreate,
    onEdit,
    onRemove,
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};
export default App;
