import { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa"
import { FaRegTimesCircle } from "react-icons/fa"

function App(){

    //輸入代辦事項元件
    const InputBox = ({ setTodolist }) => {
      const [todoInput, setTodoInput] = useState("");

      // 新增代辦
      const addListTodo = () => {
        if (todoInput !== "" && todoInput.trim() !== "") {
          let addTodoIndex = Math.random();
          setTodolist((state) => [
            { id: addTodoIndex, content: todoInput, checked: false },
            ...state,
          ]);
          setTodoInput("");
        }
      };
  
      //畫面
      return (
        <div className="inputBox">
          <input
            type="text"
            placeholder="請輸入待辦事項"
            value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") addListTodo();
            }}
          />
          <a onClick={addListTodo}>
            <FaPlus />
          </a>
        </div>
      );
    };
  
    // 代辦清單
    const [todoList, setTodolist] = useState([
      { id: 1, content: "把香蕉吃完", checked: false },
      { id: 2, content: "整理冰箱", checked: false },
      { id: 3, content: "打掃房間", checked: false },
      { id: 4, content: "洗衣服", checked: false },
      { id: 5, content: "繳房租水電", checked: false },
      { id: 6, content: "打電話訂餐廳", checked: false }
    ]);
  
    // tab清單切換
    const [itemListTab, setitemListTab] = useState(1); //tab === 全部(1)
  
    // 代辦清單元件
    const TodoListItem = ({ todoList, setTodolist, itemListTab }) => {
      // 完成事項
      const doneTodoList = (id) => {
        const newTodoList = [...todoList];
        // console.log(newTodoList)
        newTodoList.map((item) => {
          if (item.id === id) {
            item.checked = !item.checked;
          }
        });
        setTodolist(newTodoList);
      };

      // 刪除事項
      const delTodoList = (id) => {
        setTodolist(() => todoList.filter((item) => item.id !== id));
      };
  
      // reander畫面
      return (
        <ul className="todoList_item">
          {todoList
            .filter((item) => {
              // 全部
              if (itemListTab === 1) {
                return todoList;
              } else if (itemListTab === 2) {
                //待完成
                return item.checked === false;
              } else if (itemListTab === 3) {
                // 已完成
                return item.checked === true;
              }
            })
            .map((item, i) => {
              return (
                <li key={i}>
                  <label className="todoList_label">
                    <input
                      className="todoList_input"
                      type="checkbox"
                      onChange={() => doneTodoList(item.id)}
                      checked={item.checked}
                    />
                    <span>{item.content}</span>
                  </label>
                  <a onClick={() => delTodoList(item.id)}>
                    <FaRegTimesCircle />
                  </a>
                </li>
              );
            })}
        </ul>
      );
    };
  
    // 清除完成項目
    const finishItem = () => {
      setTodolist((state) => state.filter((item) => item.checked === false));
    };
  
    // wacth
    useEffect(() => {
      // eslint-disable-next-line default-case
      switch (itemListTab) {
        case "1":
          setitemListTab(todoList);
          break;
        case "2":
          setitemListTab(todoList.filter((item) => !item.checked));
          break;
        case "3":
          setitemListTab(todoList.filter((item) => item.checked));
          break;
      }
      // console.log(todoList);
    }, [itemListTab, todoList]);
  
    return (
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>
            <a href="#">ONLINE TODO LIST</a>
          </h1>
          <ul>
            <li className="todo_sm">
              <a href="#">
                <span></span>
              </a>
            </li>
            <li>
              <a href="#">登出</a>
            </li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <InputBox todoList={todoList} setTodolist={setTodolist} />
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li>
                  <a
                    className={itemListTab == 1 ? "active" : ""}
                    onClick={() => setitemListTab(1)}
                  >
                    全部
                  </a>
                </li>
                <li>
                  <a
                    className={itemListTab == 2 ? "active" : ""}
                    onClick={() => setitemListTab(2)}
                  >
                    待完成
                  </a>
                </li>
                <li>
                  <a
                    className={itemListTab == 3 ? "active" : ""}
                    onClick={() => setitemListTab(3)}
                  >
                    己完成
                  </a>
                </li>
              </ul>
              <div className="todoList_items">
                <TodoListItem
                  todoList={todoList}
                  setTodolist={setTodolist}
                  itemListTab={itemListTab}
                />
                <div className="todoList_statistics">
                  <p>
                    {todoList.filter((item) => item.checked !== true).length > 0
                      ? todoList.filter((item) => item.checked !== true).length +
                        "個待完成項目"
                      : "目前尚無待辦事項"}
                  </p>
                  <a onClick={finishItem}>清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default App;