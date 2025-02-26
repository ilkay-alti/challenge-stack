"use server";

import { getSession } from "@/lib/auth-session";
import { passwordCompare, passwordHash } from "@/lib/crypto";
import prisma from "@/lib/prisma";
import { createResponse } from "@/lib/response";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

//login
export async function login(req: NextRequest) {
  const session = await getSession();

  const { email, password } = await req.json();

  if (!email || !password) {
    return createResponse("Email and password are required!", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return createResponse("Wrong Credentials!", 404);
  }

  const passwordMatch = passwordCompare(password, user?.password!);

  if (!passwordMatch) {
    return createResponse("Wrong Credentials!", 404);
  }

  session.userId = user.id;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
}

//register
export async function register(req: NextRequest) {
  const session = await getSession();
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return createResponse("Email, name and password are required!", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return createResponse("User already exists!", 400);
  }

  const hashedPassword = await passwordHash(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: name,
    },
  });

  if (!user) {
    return createResponse("User could not be created!", 500);
  }

  session.userId = user.id;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
}

//logout
export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
