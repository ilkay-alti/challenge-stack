import { useGetAllTransactionByUserId } from "@/hooks/useTransaction";
import React from "react";

interface Transaction {
  id: string;
  type: string;
  assetSymbol: string;
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  isOpen: boolean;
  notes: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = React.useState<Transaction[]>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);

  const getAllTransactions = useGetAllTransactionByUserId();

  React.useEffect(() => {
    setIsLoading(true);
    getAllTransactions.mutate(undefined, {
      onSuccess: (data: Transaction[]) => {
        setData(data || []);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  }, [page, pageSize]);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleDelete = (id: string) => {
    // Silme işlemi için gerekli kod
    console.log("Delete transaction with id:", id);
  };

  const handleUpdate = (id: string) => {
    // Güncelleme işlemi için gerekli kod
    console.log("Update transaction with id:", id);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="py-4 text-left">Position</th>
                <th className="py-4 text-left">Asset Symbol</th>
                <th className="py-4 text-left">Position Size Dolar</th>
                <th className="py-4 text-left">Entry Price</th>
                <th className="py-4 text-left">Exit Price</th>
                <th className="py-4 text-left">PNL</th>
                <th className="py-4 text-left">ROI</th>
                <th className="py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-4 px-4 text-left">{transaction.type}</td>
                  <td className="py-4 px-4 text-left">
                    {transaction.assetSymbol}
                  </td>
                  <td className="py-4 px-4 text-left">
                    {transaction.quantity}
                  </td>
                  <td className="py-4 px-4 text-left">
                    {transaction.entryPrice}
                  </td>
                  <td className="py-4 px-4 text-left">
                    {transaction.exitPrice}
                  </td>
                  <td className="py-4 px-4 text-left">{transaction.profit}$</td>
                  <td className="py-4 px-4 text-left">
                    %
                    {transaction.exitPrice -
                      transaction.entryPrice / transaction.quantity}
                  </td>
                  <td className="py-4 px-4 text-left">
                    <button
                      onClick={() => handleUpdate(transaction.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
