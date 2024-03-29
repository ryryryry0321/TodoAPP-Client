
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { sendEditTodo } from '../function/todoFunction';
import { inputFormStyle } from '../../style/styleVariable';
import APICONF from '../../conf/APIConfig';

// 編集画面
const EditTodo = () => {
  const { id } = useParams<{ id: string }>();
  const [todoContext, setTodoContext] = useState<string>("");

  // 入力値の保持のため。stateにTODO内容を取得してセットする
  const selectTodoContextById = async () => {
    try {
      const response = await fetch(APICONF.BASE_ENDPOINT + id);

      if (!response.ok) {
        console.log(response)
      }

      const data = await response.json();
      setTodoContext(data.todo_context)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    selectTodoContextById();
  }, []);

  const callEdit = async () => {
    console.log(todoContext)

    // 編集が成功したら一覧に戻る
    const numberTypeId: number = Number(id);
    const editIsSuccess = await sendEditTodo(numberTypeId, todoContext)

    if (editIsSuccess) {
      setTodoContext("");
      window.location.href = "/";
    }
  }

  // .map() 配列の要素に対して一つ一つ処理ができる
  return (
    <div className='todo-cotent' style={{ textAlign: "center" }}>
      <div className="post" style={{ paddingTop: 50, paddingBottom: 50 }}>
        <div>
          <h2>EDIT TODO ID:{id}</h2>
          <textarea value={todoContext} onChange={(e) =>
            setTodoContext(e.target.value)}
            placeholder="TODO内容を書き込む(MAX500)"
            style={inputFormStyle}
          />
        </div>
        <Button variant='contained' color="secondary" onClick={callEdit}>UPDATE</Button>
        <Button variant='contained' href="/">BACK</Button>
      </div>
    </div>
  );
};

export default EditTodo;