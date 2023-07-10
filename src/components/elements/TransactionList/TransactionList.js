import React from "react";
import styles from "./index.module.css";

const TransactionList = ({ transactionList }) => {
  // Step 1: Sort the transaction list by timestamp in descending order
  const sortedTransactions = transactionList.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className={styles["transaction-list"]}>
      <table className={styles["transaction-table"]}>
        <thead>
          <tr>
            <th>No. Order</th>
            <th>Nama Product</th>
            <th>Quantity</th>
            <th>Total Harga</th>
            <th>Total Bayar</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => {
            return (
              <tr key={index}>
                <td>{transaction.no_order}</td>
                <td>
                  {transaction.products.map((product, indexProduct) => (
                    <div key={indexProduct}>
                      <p className={styles['transaction-table__products-name']}>{product.product}</p>
                    </div>
                  ))}
                </td>
                <td>
                  {transaction.products.map((product, indexProduct) => (
                    <div key={indexProduct}>
                      <p>{product.quantity}</p>
                    </div>
                  ))}
                </td>
                <td>{transaction.total_price}</td>
                <td>{transaction.paid_amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
