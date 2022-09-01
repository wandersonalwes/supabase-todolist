import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "a senha deve ter pelo menos 6 caracteres"),
});
