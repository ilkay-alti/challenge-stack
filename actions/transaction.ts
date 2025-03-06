"use server";

import { getSession } from "@/lib/auth-session";
import prisma from "@/lib/prisma";
import {
  CreatedTransactionType,
  DeletedTransactionType,
  UpdatedTransactionType,
} from "@/validations/Transaction.validation";

// Transaction Create
export async function createTransaction({
  data,
}: {
  data: CreatedTransactionType;
}) {
  const session = await getSession();

  if (!session?.userId) {
    throw new Error("User not authenticated");
  }

  // Create a new transaction
  const transaction = await prisma.transaction.create({
    data: {
      type: data.type,
      assetSymbol: data.assetSymbol,
      quantity: data.quantity,
      entryPrice: data.entryPrice,
      exitPrice: data.exitPrice,
      profit: data.profit,
      isOpen: data.isOpen,
      notes: data.notes,
      challengeId: data.challengeId,
      userId: session.userId,
    },
  });
  if (!transaction) {
    throw new Error("Transaction not created");
  }
  return { success: true };
}

// Transaction Update
export async function updateTransaction({
  data,
}: {
  data: UpdatedTransactionType;
}) {
  const session = await getSession();

  if (session?.userId) {
    throw new Error("User not authenticated");
  }
  //

  // Update transaction
  const existingTransaction = await prisma.transaction.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!existingTransaction) {
    throw new Error("Transaction not found");
  }

  if (
    session.role === "user" ||
    existingTransaction.userId !== session.userId
  ) {
    throw new Error("Unauthorized access");
  }

  const updateTransaction = await prisma.transaction.update({
    where: {
      id: data.id,
    },
    data: {
      type: data.type,
      assetSymbol: data.assetSymbol,
      quantity: data.quantity,
      entryPrice: data.entryPrice,
      exitPrice: data.exitPrice,
      profit: data.profit,
      isOpen: data.isOpen,
      notes: data.notes,
      challengeId: data.challengeId,
      userId: session.userId,
    },
  });
  if (!updateTransaction) {
    throw new Error("Transaction not updated");
  }
  return { success: true };
}

// Transaction Delete
export async function deletedTransaction({
  data,
}: {
  data: DeletedTransactionType;
}) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error("User not authenticated");
  }

  const existingTransaction = await prisma.transaction.findUnique({
    where: {
      id: data.id,
    },
  });

  if (
    session.role === "user" ||
    existingTransaction?.userId === session.userId
  ) {
    {
      throw new Error("Unauthorized access");
    }
  }

  await prisma.transaction.delete({
    where: {
      id: data.id,
    },
  });
}

// User Transaction Get All
export async function getAllUserTransactions() {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error("User not authenticated");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.userId,
    },
  });

  return transactions;
}
