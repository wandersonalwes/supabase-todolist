import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { client } from "../../configs/supabase";

export const Login = ({ onSubmit }: any) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    // onSubmit({
    //   email: values.email,
    //   password: values.password,
    // });

    const { error: authError } = await client.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (authError) setError(authError.message);
  };

  const handleChange = (event: any) => {
    setValues((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form
      onSubmit={handleLogin}
      className="min-h-screen flex justify-center items-center bg-slate-100"
      data-testid="test-login-page"
    >
      <div className="p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Entrar</h2>
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
          Entrar
        </Button>

        <span className="text-red-500 mt-8 block">{error && error}</span>
      </div>
    </form>
  );
};
