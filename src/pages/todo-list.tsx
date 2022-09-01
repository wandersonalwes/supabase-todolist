import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { TodoItem, TodoType } from "../components/todo-item";
import { useAuth } from "../hooks/useAuth";
import debounce from "lodash.debounce";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateStatus,
  updateTodo,
} from "../services/todos";

export const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { user } = useAuth();

  const debouncedSave = useCallback(
    debounce((id, value) => updateTodo(id, value), 1000),
    []
  );

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo) return;
    const { error, data } = await addTodo(todo, user!.id);

    if (error) {
      return console.log(error);
    }

    if (data) {
      setTodos((state) => [data, ...state]);
      setTodo("");
    }
  };

  const handleRemove = async (id: string) => {
    const { error } = await deleteTodo(id);

    if (error) return console.log(error);

    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleComplete = async (id: string, status: boolean) => {
    const { error } = await updateStatus(id, status);

    if (error) return console.log(error);

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: status };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleEdit = (id: string, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: value };
      }

      return todo;
    });

    setTodos(newTodos);

    debouncedSave(id, value);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllTodos();
      if (data) setTodos(data);
      if (error) console.log(error);
    })();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen pt-20">
      <Header />
      <form onSubmit={handleAddTodo}>
        <div className="flex items-center p-8 flex-col gap-3 max-w-6xl mx-auto">
          <div className="flex gap-4 items-center w-full mb-8">
            <Input
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
              placeholder="Nova tarefa"
              containerClassName="flex-1"
            />
            <Button type="submit">Adicionar</Button>
          </div>
          <div className="w-full rounded-lg space-y-2">
            {todos.map((todo) => {
              return (
                <TodoItem
                  todo={todo}
                  onRemove={handleRemove}
                  onComplete={handleComplete}
                  onEdit={handleEdit}
                />
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
