import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = z.object({
  email: z.string().email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email("Geçerli bir email giriniz"),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  token: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
