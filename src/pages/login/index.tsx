import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { client } from "../../configs/supabase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../../validations/login";

type Credentials = {
  email: string;
  password: string;
};

export const Login = () => {
  const [action, setAction] = useState<"login" | "signup">("login");
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const handleLogin = async (data: Credentials) => {
    const { error: authError } = await client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      toast.error("Seu login falhou");
    }
  };

  const handleSignUp = async (data: Credentials) => {
    const { data: authData, error: authError } = await client.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authData) {
      toast.success("Confirme seu e-mail para finalizar o cadastro");
    }

    if (authError) {
      toast.error("Erro ao criar conta!");
    }
  };

  const onSubmit = (data: Credentials) => {
    return action === "login" ? handleLogin(data) : handleSignUp(data);
  };

  const toggleAction = () => {
    setAction((currentAction) =>
      currentAction === "login" ? "signup" : "login"
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex justify-center items-center bg-slate-100"
      data-testid="test-login-page"
    >
      <div className="p-6 w-full max-w-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          {action === "login" ? "Entrar" : "Criar conta"}
        </h2>
        <Input
          error={errors.email?.message}
          data-testid="test-email"
          type="email"
          placeholder="E-mail"
          containerClassName="mb-4"
          {...register("email")}
        />
        <Input
          {...register("password")}
          data-testid="test-password"
          type="password"
          placeholder="Senha"
          containerClassName="mb-8"
          error={errors.password?.message}
        />

        <Button
          type="submit"
          className="w-full"
          data-testid="test-btn-submit"
          isLoading={isSubmitting}
        >
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
      </div>
    </form>
  );
};
