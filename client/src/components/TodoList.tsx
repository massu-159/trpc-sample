import { CSSProperties, useState } from "react";
import { trpc } from "../utils/trpc";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "linear-gradient(90deg, rgba(255, 0, 165, 0.5), rgba(191, 233, 255, 1))",
  },
  innerContainer: {
    width: "50%",
    height: "50%",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "none",
    outline: "none",
  },
  list: {
    listStyleType: "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    margin: "8px 0",
    padding: "12px",
    borderRadius: "4px",
    textAlign: "left",
  },
  addButton: {
    padding: 10,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  deleteButton: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "red",
    textAlign: "right",
  },
};

const TodoList = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const AllTodos = trpc.getTodos.useQuery()
  // サーバー側で設定した型定義が参照できていることを確認する
  // console.log(AllTodos.data?.map((todo) => todo.name))

  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      setInputValue("")
      AllTodos.refetch()
    }
  })
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      AllTodos.refetch()
    }
  })
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <p style={styles.title}>Todo List</p>
        <input
          type="text"
          placeholder="What needs to be done?"
          style={styles.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button style={styles.addButton} onClick={()=>addTodo.mutate(inputValue)}>Add Todo</button>
        <ul style={styles.list}>
          {AllTodos.data?.map((todo) => (
            <li style={styles.listItem} key={todo.id}>
              {todo.content}
              <span style={styles.deleteButton} onClick={()=>deleteTodo.mutate(todo.id)}>✖</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;