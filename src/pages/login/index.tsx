import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { client } from "../../configs/supabase";

export const Login = () => {
  const [action, setAction] = useState<"login" | "signup">("login");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { error: authError } = await client.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (authError) setError(authError.message);
  };

  const handleSignUp = async () => {
    const { error: authError } = await client.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (authError) setError(authError.message);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    return action === "login" ? handleLogin() : handleSignUp();
  };

  const handleChange = (event: any) => {
    setValues((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const toggleAction = () => {
    setAction((currentAction) =>
      currentAction === "login" ? "signup" : "login"
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex justify-center items-center bg-slate-100"
      data-testid="test-login-page"
    >
      <div className="p-6 max-w-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          {action === "login" ? "Entrar" : "Criar conta"}
        </h2>
        <Input
          data-testid="test-email"
          type="email"
          placeholder="E-mail"
          className="mb-4"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Input
          data-testid="test-password"
          type="password"
          placeholder="Senha"
          className="mb-8"
          name="password"
          value={values.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full" data-testid="test-btn-submit">
          {action === "login" ? "Entrar" : "Criar conta"}
        </Button>

        <button
          type="button"
          onClick={toggleAction}
          className="h-12 mt-2 w-full"
        >
          <span className="block text-center text-gray-400">
            {action === "login" && "Não tem uma conta? Cadastre-se"}
            {action === "signup" && "Já tem uma conta? Entrar"}
          </span>
        </button>

        <span className="text-red-500 mt-8 block">{error && error}</span>
      </div>
    </form>
  );
};
