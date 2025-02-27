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

export const generateTwoFactorSchema = z.object({
  userId: z.string(),
});

export const verifyTwoFactorSchema = z.object({
  token: z.string().length(6, "Doğrulama kodu 6 karakter olmalıdır"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
export type GenerateTwoFactorSchema = z.infer<typeof generateTwoFactorSchema>;
export type VerifyTwoFactorSchema = z.infer<typeof verifyTwoFactorSchema>;
