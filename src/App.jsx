// import { useState } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateTodosStatus,
} from "./redux/slices/todosSlice";
import { toast } from "react-toastify";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch(); //useDispatch untuk memasukkan data dari global state
  // console.log(todos);

  const [newTodo, setNewTodo] = useState("");

  //filter ini akan menerima array baru yang berisi todo, nanti jumlahnya bisa kita panggil
  const getTodosDone = () => {
    return todos.filter((todo) => {
      return todo.isDone === true;
    });
  };
  // setiap kali ada perubahan pada input todo, maka dia akan mengisi perubahan tersebut kedalam state newTodo ini

  const handleDelete = (idx) => {
    dispatch(deleteTodo(idx));
    toast.success("Delete Todo Success");
  };

  const handleIsDone = (index, value) => {
    dispatch(updateTodosStatus({ index, isDone: value }));
    toast.success("Update Todo Success");
  };

  const handleAddTodo = () => {
    if (!newTodo) {
      return toast.error("Input Ga Boleh Kosong Woi");
    }
    dispatch(addTodo({ title: newTodo, isDone: false }));
    setNewTodo("");
    toast.success("Create New Todo Success");
  };
  console.log(newTodo);
  return (
    <>
      <div className="bg-slate-800 h-screen">
        <div className="container mx-auto text-white max-w-[800px]">
          <h1 className="text-center text-3xl font-bold">Chores Todo List</h1>

          <table className="w-full">
            {todos.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.isDone}
                      onChange={(e) => handleIsDone(index, e.target.checked)} //checkbox ambil inputnya dari checked
                    />
                  </td>
                  <td>
                    <p className={todo.isDone ? "line-through" : ""}>
                      {todo.title}
                    </p>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </table>
          <h1 className="text-center text-3xl font-bold">
            Done: {getTodosDone().length}
          </h1>

          <div>
            {/* Kita akan buat apa yang kita ketik disini bakal ditampung ke dalam state */}
            <input
              type="text"
              className="w-full text-black"
              //Hafalan (untuk mengakses sebuah value dari input text)
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <button
              className="bg-slate-400 p-2 rounded-xl mt-2"
              onClick={handleAddTodo}
            >
              {/* handleAddtodo bisa langsung dipanggil karena tidak butuh parameter */}
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
