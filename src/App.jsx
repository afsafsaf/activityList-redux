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
    toast.success("Delete activity success");
  };

  const handleIsDone = (index, value) => {
    dispatch(updateTodosStatus({ index, isDone: value }));
    toast.success("Update activity success");
  };

  const handleAddTodo = () => {
    if (!newTodo) {
      return toast.error("Input can not be empty");
    }
    dispatch(addTodo({ title: newTodo, isDone: false }));
    setNewTodo("");
    toast.success("Create activity success");
  };
  console.log(newTodo);
  return (
    <>
      <div className=" bg-[url('/fire.jpg')]  h-screen w-full mx-auto md:grid grid-cols-2 ">
        <div className="overflow-x-auto w-3/4 mx-auto text-center md:mt-5">
          <h3 className="mx-auto w-full text-center text-3xl font-bold mb-5 mt-5">
            Activity List
          </h3>

          <table className="table w-full">
            {todos.map((todo, index) => {
              return (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          checked={todo.isDone}
                          onChange={(e) =>
                            handleIsDone(index, e.target.checked)
                          } //checkbox ambil inputnya dari checked
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="/activity.jpg"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            <p className={todo.isDone ? "line-through" : ""}>
                              {todo.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                </tbody>
              );
            })}
            {/* head */}

            {/* foot */}
          </table>
        </div>
        <div className="mx-auto w-3/4 md:mt-5">
          <h1 className="text-3xl font-bold mt-5">
            Done: {getTodosDone().length}
          </h1>
          {/* Kita akan buat apa yang kita ketik disini bakal ditampung ke dalam state */}
          <input
            type="text"
            placeholder="Type Your Activity"
            className="input input-bordered input-primary w-full max-w-xs mt-5 mb-3"
            //Hafalan (untuk mengakses sebuah value dari input text)
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <br />
          <button className="btn btn-neutral" onClick={handleAddTodo}>
            {/* handleAddtodo bisa langsung dipanggil karena tidak butuh parameter */}
            Add Activity
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
