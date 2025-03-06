"use client";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

const AddTransactions = () => {
  const [type, setType] = useState<"LONG" | "SHORT" | "BUY" | "SELL">("LONG");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [entryPrice, setEntryPrice] = useState<number | undefined>(undefined);
  const [exitPrice, setExitPrice] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(true);
  const [notes, setNotes] = useState("");

  const createTransaction = useCreateTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity === undefined || isNaN(quantity)) {
      alert("Please enter a valid quantity");
      return;
    }

    if (entryPrice === undefined || isNaN(entryPrice)) {
      alert("Please enter a valid entry price");
      return;
    }

    if (!isOpen && (exitPrice === undefined || isNaN(exitPrice))) {
      alert("Please enter a valid exit price");
      return;
    }

    createTransaction.mutate({
      type,
      assetSymbol,
      quantity,
      entryPrice,
      exitPrice,
      isOpen,
      notes,
    });
  };

  return (
    <div
      className="w-4/12 h-full bg-[#001e3c] p-8 rounded-lg shadow-lg text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Transaction</h2>
          <h3>Create a new transaction</h3>
        </div>
        <div className="flex items-center justify-end">
          <button className="text-[#3399ff] bg-[#0D2946] hover:bg-[#F1F5F9]/20 rounded-lg p-4">
            <XIcon size={23} />
          </button>
        </div>
      </div>

      <form className="flex flex-col mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-12">
          <div className="w-full">
            <label htmlFor="assetSymbol" className="block text-sm font-medium">
              Asset Symbol
            </label>
            <div className="mt-1 relative">
              <input
                id="assetSymbol"
                name="assetSymbol"
                type="text"
                className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
                placeholder="BTC | ETH | USDT"
                value={assetSymbol}
                onChange={(e) => setAssetSymbol(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="type" className="block text-sm font-medium">
              Type
            </label>
            <div className="mt-1 relative">
              <input
                id="type"
                name="type"
                type="text"
                className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
                placeholder="LONG | SHORT | BUY | SELL"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="w-full">
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity Size
            </label>
            <div className="mt-1 relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
                placeholder="250 $"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="entryPrice" className="block text-sm font-medium">
              Entry Price
            </label>
            <div className="mt-1 relative">
              <input
                id="entryPrice"
                name="entryPrice"
                type="number"
                className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
                placeholder="89.665,64 Dolar"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 p-2 rounded-md ${isOpen ? "bg-green-500" : "bg-red-500"}`}
          >
            <label htmlFor="isOpen" className="text-sm font-medium">
              {!isOpen ? "Position Close" : "Position Open"}
            </label>
          </div>
        </div>
        {!isOpen && (
          <div>
            <div className="w-full">
              <label htmlFor="exitPrice" className="block text-sm font-medium">
                Exit Price
              </label>
              <div className="mt-1 relative">
                <input
                  id="exitPrice"
                  name="exitPrice"
                  type="number"
                  className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
                  placeholder="85.935,22 Dolar"
                  value={exitPrice}
                  onChange={(e) => setExitPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full">
          <label htmlFor="notes" className="block text-sm font-medium">
            Note
          </label>
          <div className="mt-1 relative">
            <input
              id="notes"
              name="notes"
              type="text"
              className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
              placeholder="BTC long position open because of the bullish trend"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#3399FF] text-[#151936] font-bold text-xl p-2 rounded-md w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default AddTransactions;
