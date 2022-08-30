import { Trash } from "phosphor-react";
import { Checkbox } from "./checkbox";

export type TodoType = {
  id: string;
  task: string;
  is_complete: boolean;
};

type Props = {
  todo: TodoType;
  onRemove: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, value: string) => void;
};

export const TodoItem = ({ todo, onRemove, onComplete, onEdit }: Props) => {
  return (
    <div className="bg-white px-6  rounded shadow flex justify-between items-center">
      <div className="flex items-center gap-4 flex-1">
        <Checkbox
          checked={todo.is_complete}
          onCheckedChange={() => onComplete(todo.id)}
        />

        <input
          type="text"
          className="w-full py-6 text-gray-600 outline-none"
          value={todo.task}
          onChange={(event) => onEdit(todo.id, event.target.value)}
        />
      </div>

      <button onClick={() => onRemove(todo.id)}>
        <Trash className="w-5 h-5 text-gray-400 hover:text-indigo-500" />
      </button>
    </div>
  );
};
