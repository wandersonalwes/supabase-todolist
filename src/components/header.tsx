import { SignOut } from "phosphor-react";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { signOut } = useAuth();
  return (
    <header className="bg-indigo-500 fixed inset-x-0 top-0 h-20">
      <div className="py-6 flex items-center gap-4 justify-between px-6 max-w-6xl mx-auto">
        <h1 className="text-xl text-white font-bold">Todo List</h1>
        <button onClick={signOut}>
          <SignOut className="w-8 h-8 text-white" />
        </button>
      </div>
    </header>
  );
};
