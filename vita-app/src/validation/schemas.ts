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
    .max(100, `${label} muito grande`)
    .refine((v) => !INVALID_NAME_CHARS.test(v), `${label} contém caracteres proibidos`);

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Preencha a senha"),
});

export const registerStep1Schema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito grande")
    .refine((v) => !INVALID_NAME_CHARS.test(v), "Nome contém caracteres proibidos"),
  email: emailField,
});

export const registerStep2Schema = z
  .object({
    senha: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .refine((v) => /[A-Z]/.test(v), "A senha deve ter ao menos uma letra maiúscula")
      .refine((v) => /[0-9]/.test(v), "A senha deve ter ao menos um número")
      .refine((v) => /[^a-zA-Z0-9]/.test(v), "A senha deve ter ao menos um caractere especial"),
    confirmarSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
    accessType: z.enum(["produtor", "estudante"], "Escolha o tipo de acesso"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export const registerStep3Schema = z.object({
  telefone: z
    .string()
    .refine(
      (v) => v === "" || [10, 11].includes(onlyDigits(v).length),
      "Telefone inválido. Digite DDD + número",
    ),
  dataNascimento: z
    .string()
    .refine((v) => v === "" || isValidDate(v), "Data de nascimento inválida ou no futuro"),
  endereco: z
    .string()
    .trim()
    .max(255, "Endereço muito grande")
    .refine((v) => !INVALID_ADDRESS_CHARS.test(v), "Endereço contém caracteres proibidos"),
  cnpj: z
    .string()
    .refine(
      (v) => onlyDigits(v).length === 0 || onlyDigits(v).length === 14,
      "CNPJ deve ter 14 dígitos",
    ),
  escola: schoolOrCourseField("Nome da escola"),
  curso: schoolOrCourseField("Nome do curso"),
});