import {
  createTransaction,
  deletedTransaction,
  getAllUserTransactions,
  updateTransaction,
} from "@/actions/transaction";
import {
  CreatedTransactionType,
  DeletedTransactionType,
  UpdatedTransactionType,
} from "@/validations/Transaction.validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useCreateTransaction() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreatedTransactionType) => createTransaction({ data }),
    onSuccess: () => {
      toast.success("Transaction created successfully!");
      router.refresh();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
      return { message: errorMessage };
    },
  });
}

export function useUpdateTransaction() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdatedTransactionType) => updateTransaction({ data }),
    onSuccess: () => {
      toast.success("Transaction updated successfully!");
      router.refresh();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
      return { message: errorMessage };
    },
  });
}

export function useDeleteTransaction() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: DeletedTransactionType) => deletedTransaction({ data }),
    onSuccess: () => {
      toast.success("Transaction deleted successfully!");
      router.refresh();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
      return { message: errorMessage };
    },
  });
}

export function useGetAllTransactionByUserId() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => getAllUserTransactions(),
    onSuccess: () => {
      toast.success("Transaction fetched successfully!");
      router.refresh();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
      return { message: errorMessage };
    },
  });
}
