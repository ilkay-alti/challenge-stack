import { z } from "zod";

const TransactionTypeSchema = z.enum(["LONG", "SHORT", "BUY", "SELL"]);
// Create transaction schema
export const createdTransactionSchema = z.object({
  type: TransactionTypeSchema,
  assetSymbol: z.string().nonempty(),
  quantity: z.number().int(),
  entryPrice: z.number().int(),
  exitPrice: z.number().optional(),
  profit: z.number().optional(),
  isOpen: z.boolean(),
  notes: z.string(),
  challengeId: z.number(),
  userId: z.string().nonempty(),
});

// Update transaction schema
export const updatedTransactionSchema = z.object({
  id: z.string().nonempty(),
  type: TransactionTypeSchema,
  assetSymbol: z.string(),
  quantity: z.number().int(),
  entryPrice: z.number().int(),
  exitPrice: z.number().optional(),
  profit: z.number().optional(),
  isOpen: z.boolean(),
  notes: z.string(),
  challengeId: z.number(),
  userId: z.string().nonempty(),
});

// Delete transaction schema
export const deletedTransactionSchema = z.object({
  id: z.string().nonempty(),
});

// Get transaction schema
export const getTransactionSchema = z.object({
  id: z.string().nonempty(),
});

//types
export type TransactionType = z.infer<typeof TransactionTypeSchema>;
export type CreatedTransactionType = z.infer<typeof createdTransactionSchema>;
export type UpdatedTransactionType = z.infer<typeof updatedTransactionSchema>;
export type DeletedTransactionType = z.infer<typeof deletedTransactionSchema>;
export type GetTransactionType = z.infer<typeof getTransactionSchema>;
