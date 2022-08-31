import { client } from "../configs/supabase";
import { v4 as uuidv4 } from "uuid";

export const getAllTodos = async () => {
  return await client
    .from("todos")
    .select("*")
    .order("id", { ascending: false });
};

export const addTodo = async (task: string, userId: string) => {
  const id = uuidv4();
  const { error } = await client
    .from("todos")
    .insert({ id, task, user_id: userId })
    .single();

  const data = {
    id,
    task,
    done: false,
  };

  return {
    data: !error && data,
    error,
  };
};

export const deleteTodo = async (id: string) => {
  return await client.from("todos").delete().eq("id", id).select("*");
};

export const updateTodo = async (id: string, task: string) => {
  return await client.from("todos").update({ task }).match({ id });
};

export const updateStatus = async (id: string, done: boolean) => {
  return await client.from("todos").update({ done }).match({ id });
};
