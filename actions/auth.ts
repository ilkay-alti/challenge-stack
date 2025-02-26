// actions/auth.ts
"use server";

import { getSession } from "@/lib/auth-session";
import { passwordCompare, passwordHash } from "@/lib/crypto";
import prisma from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/validations/Auth.validation";

export async function login(email: string, password: string) {
  const session = await getSession();
  const parsedData = loginSchema.safeParse({ email, password });

  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await passwordCompare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  session.userId = user.id;
  session.isLoggedIn = true;
  await session.save();
  return { success: true };
}

export async function register(email: string, password: string, name: string) {
  const session = await getSession();

  if (!email || !password || !name) {
    const errMsg = "Email, name and password are required!";
    throw new Error(errMsg);
  }

  const parsedData = registerSchema.safeParse({ email, password, name });
  if (!parsedData.success) {
    const errMsg = parsedData.error.errors[0].message;
    throw new Error(errMsg);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const errMsg = "User already exists!";
    throw new Error(errMsg);
  }

  const hashedPassword = await passwordHash(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  session.userId = user.id;
  session.isLoggedIn = true;
  await session.save();
  return { success: true };
}

export async function logout() {
  const session = await getSession();

  session.destroy();
  return { success: true };
}
