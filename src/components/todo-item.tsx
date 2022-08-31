import classNames from "classnames";
import { Trash } from "phosphor-react";
import { Checkbox } from "./checkbox";

export type TodoType = {
  id: string;
  task: string;
  done: boolean;
};

type Props = {
  todo: TodoType;
  onRemove: (id: string) => void;
  onComplete: (id: string, status: boolean) => void;
  onEdit: (id: string, value: string) => void;
};

export const TodoItem = ({ todo, onRemove, onComplete, onEdit }: Props) => {
  return (
    <div className="bg-white px-6  rounded shadow flex justify-between items-center">
      <div className="flex items-center gap-4 flex-1">
        <Checkbox
          checked={todo.done}
          onCheckedChange={() => onComplete(todo.id, !todo.done)}
        />

        <input
          type="text"
          className={classNames("w-full py-6 text-gray-600 outline-none", {
            "line-through text-gray-300 ": todo.done,
          })}
          value={todo.task}
          onChange={(event) => onEdit(todo.id, event.target.value)}
          disabled={todo.done}
        />
      </div>

      <button onClick={() => onRemove(todo.id)}>
        <Trash className="w-5 h-5 text-gray-400 hover:text-indigo-500" />
      </button>
    </div>
  );
};
