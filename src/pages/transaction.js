import React, { useEffect, useState } from "react";
import Layout from "@/components/layouts/Layout";
import api from "@/api";
import TransactionList from "@/components/elements/TransactionList/TransactionList.js";

export default function Transaction() {
  const [transactionList, setTransactionList] = useState([]);

  const fetchTransactions = async () => {
    const response = await api.get("/transactions");
    const data = response.data.payload.transactions;
    setTransactionList(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


  return (
    <Layout>
      <h1>Transactions History</h1>
      <TransactionList  transactionList={transactionList}/>
    </Layout>
  );
}
