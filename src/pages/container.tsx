import { useAuth } from "../hooks/useAuth";
import { TodoList } from "./todo-list";
import { Login } from "./login";

export const Container = () => {
  const { signed, isLoading } = useAuth();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return signed ? <TodoList /> : <Login />;
};
