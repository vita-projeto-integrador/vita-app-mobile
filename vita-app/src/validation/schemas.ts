import { z } from "zod";
import { isValidDate } from "./authSchemas";

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const INVALID_NAME_CHARS = /[^a-zA-ZÀ-ÿ\s]/;
const INVALID_ADDRESS_CHARS = /[^a-zA-ZÀ-ÿ0-9\s]/;

const emailField = z
  .string()
  .trim()
  .min(1, "E-mail é obrigatório")
  .max(100, "Email muito grande")
  .pipe(z.email("Email inválido"));

const schoolOrCourseField = (label: string) =>
  z
    .string()
    .trim()
    .max(100, `${label} é muito grande`)
    .refine((v) => !INVALID_NAME_CHARS.test(v), "Contem caracteres proibidos");

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Preencha a senha"),
});

export const registerStep1Schema = z.object({
  // No web o nome é dividido em firstName/lastName (cada um com max 50) e enviado
  // à API como `${firstName} ${lastName}`. No mobile é um campo único, então
  // validamos as mesmas regras sobre a primeira palavra e o restante.
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .refine((v) => !INVALID_NAME_CHARS.test(v), "Contem caracteres proibidos")
    .refine(
      (v) => v === "" || v.split(/\s+/).length >= 2,
      "Sobrenome é obrigatório",
    )
    .refine((v) => v.split(/\s+/)[0].length <= 50, "Nome muito grande")
    .refine(
      (v) => v.split(/\s+/).slice(1).join(" ").length <= 50,
      "Sobrenome muito grande",
    ),
  email: emailField,
});

export const registerStep2Schema = z
  .object({
    senha: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .refine(
        (v) => /[A-Z]/.test(v),
        "Deve conter ao menos uma letra maiúscula",
      )
      .refine((v) => /[0-9]/.test(v), "Deve conter ao menos um número")
      .refine(
        (v) => /[^a-zA-Z0-9]/.test(v),
        "Deve conter ao menos um caractere especial",
      ),
    confirmarSenha: z.string().min(1, "Confirmação é obrigatória"),
    accessType: z.enum(["produtor", "estudante"], "Escolha o tipo de acesso"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export const registerStep3Schema = z.object({
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine((v) => onlyDigits(v).length >= 10, "Mínimo 10 dígitos")
    .refine((v) => onlyDigits(v).length <= 11, "Máximo 11 dígitos"),
  dataNascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((v) => onlyDigits(v).length === 8, "Formato Inválido")
    .refine(
      (v) => onlyDigits(v).length !== 8 || isValidDate(v),
      "Data inválida ou no futuro",
    ),
  endereco: z
    .string()
    .trim()
    .min(1, "Endereço é obrigatório")
    .max(255, "Endereço muito grande")
    .refine(
      (v) => !INVALID_ADDRESS_CHARS.test(v),
      "Contem caracteres proibidos",
    ),
  cnpj: z
    .string()
    .refine(
      (v) => onlyDigits(v).length === 0 || onlyDigits(v).length === 14,
      "CNPJ deve ter 14 dígitos",
    ),
  escola: schoolOrCourseField("Nome da escola"),
  curso: schoolOrCourseField("Nome do curso"),
});
