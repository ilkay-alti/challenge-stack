"use client";
import TopBar from "@/components/navigate/TopBar";
import AddTransactions from "@/components/transactions/AddTransactions";
import DataTable from "@/components/transactions/DataTable";
import React, { useState } from "react";

const TransactionPage = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <TopBar />
      <h1>Transaction page</h1>
      <button onClick={() => setShowAdd(true)}>Add Transaction</button>
      {showAdd && <AddTransactions setShowAdd={setShowAdd} />}
      <DataTable />
    </div>
  );
};

export default TransactionPage;
