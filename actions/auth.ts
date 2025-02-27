// actions/auth.ts
"use server";

import { getSession } from "@/lib/auth-session";
import { passwordCompare, passwordHash } from "@/utils/crypto";
import prisma from "@/lib/prisma";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
} from "@/utils/token";
import { loginSchema, registerSchema } from "@/validations/Auth.validation";
import { sendResetPasswordEmail, sendTwoFactorEmail } from "@/utils/mail";

//Login
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
  session.twoFA = user.twoFactorConfirmation;
  await session.save();

  if (user.twoFactorConfirmation) {
    tokenGeneration2FA(user.id);
  }
  return { success: true };
}
//Register
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
  session.twoFA = user.twoFactorConfirmation;
  await session.save();
  return { success: true };
}
//Logout
export async function logout() {
  const session = await getSession();

  session.destroy();
  return { success: true };
}
//Reset Password token generation
export async function forgetPassword(email: string) {
  const session = await getSession();
  if (session.userId) {
    throw new Error("You are already logged in");
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Email not found pls register");
  }
  const passwordResetToken = await generatePasswordResetToken(user.email);

  if (!passwordResetToken) {
    throw new Error("Error in generating password reset token");
  }
  sendResetPasswordEmail(user.email, passwordResetToken.token);
  return { success: true };
}
// New Password
export async function newPassword(token: string, password: string) {
  if (!password || !token) {
    throw new Error("Password and token are required");
  }

  console.log(token, password);

  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token: token },
  });
  console.log(existingToken, "existingToken");

  if (!existingToken) {
    throw new Error(`Invalid token`);
  }
  const hasExpired = existingToken.expires < new Date();
  if (hasExpired) {
    throw new Error("Token has expired");
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  const hashedPassword = await passwordHash(password);

  // Update user password
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  // Delete Token
  await prisma.passwordResetToken.delete({
    where: {
      token,
    },
  });

  return { success: true };
}
//2FA token generation
export async function tokenGeneration2FA(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const generatedToken = await generateTwoFactorToken(user.email);

  if (!generatedToken) {
    throw new Error("Error in generating 2FA token");
  }

  sendTwoFactorEmail(user.email, generatedToken.token);

  return { success: true };
}
//2FA token verification
export async function verifyToken2FA(token: string) {
  const session = await getSession();

  if (!token) {
    throw new Error("Email and token are required");
  }

  const existingToken = await prisma.twoFactorToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    throw new Error("Invalid token");
  }

  const hasExpired = existingToken.expires < new Date();

  if (hasExpired) {
    throw new Error("Token has expired");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.twoFactorToken.delete({
    where: {
      token: existingToken.token,
    },
  });

  session.twoFAVerified = true;
  await session.save();

  return { success: true };
}
