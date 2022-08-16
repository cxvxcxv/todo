import Head from 'next/head';
import Link from 'next/link';
import  { useState } from 'react';
import { uuid } from "uuidv4";

export default function Index() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const saveTodo = () => {
    if (input != "") {
      setTodo((prevTodos => [{ name: input, key: uuid() }, ...prevTodos]));
      setInput("");
    }
  };
  const deleteTodo = (key) => {
    setTodo(todo.filter((item) => key != item.key))
  };
  const handleItemImportant = (key) => {
    setTodo ((prevItems) =>
      prevItems.map((item) => {
        if (item.key === key) {
          return { ...item, important: !item.important };
        } else return item;
      })
    );
  };
  return (
    <div className='wrapper'>
      <Head>
        <title>Todo list</title>
        <meta charSet='utf-8' />
      </Head>
      <div>
        <input
          className="input"
          placeholder="Enter a Task"
          value={input}
          type="text"
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button className='save' onClick={saveTodo}>Save</button>
        {
          todo.map((item) => (
            <div key={item.key} className="todo-item">
              <span
            onClick={() => handleItemImportant(item.key)}
            className={`name ${item.important ? "important" : ""}`}
          >
            {item.name}
          </span>
              <button className='delete' onClick={() => deleteTodo(item.key)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}