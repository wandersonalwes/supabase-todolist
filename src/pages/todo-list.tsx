import { FormEvent, useState } from "react";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { TodoItem, TodoType } from "../components/todo-item";

export const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo) return;
    setTodos((state) => [
      {
        id: new Date().getTime().toString(),
        is_complete: false,
        task: todo,
      },
      ...state,
    ]);
    setTodo("");
  };

  const handleRemove = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleComplete = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, is_complete: !todo.is_complete };
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
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <form onSubmit={handleAddTodo}>
        <div className="flex items-center p-8 flex-col gap-3 max-w-6xl mx-auto">
          <div className="flex gap-4 items-center w-full mb-8">
            <Input
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
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
