import React, { useState } from "react";
import "./dashboard.css";
import ExpenseLogo from "../../assets/ExpenseLogo.png";
import ExpenseChart from "../chart/ExpenseChart";
import Popup from "../modal/Popup";

const Dashboard = () => {
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState("");

  //function to set the income amount
  const handleIncomeAmount = (e) => {
    setIncomeAmount(e.target.value);
  };

  //function to open pop up upon clicking add income
  const handleAddIncome = () => {
    setIsBalanceModalOpen(true);
  };

  // function to add balance while clicking on add income button inside popup
  const handleAddBalance = () => {
    setBalance(balance + parseInt(incomeAmount));
    handleCloseBalanceModal();
    setIncomeAmount("");
  };

  // function to close the popup for balance
  const handleCloseBalanceModal = () => {
    setIsBalanceModalOpen(false);
  };

  //function to open expense modal
  const handleAddExpenses = () => {
    setIsExpenseModalOpen(true);
  };

  // function to close the popup for expense
  const handleExpenseCloseModal = () => {
    setIsExpenseModalOpen(false);
  };

  return (
    <div>
      {/* logo for expense tracker */}
      <img className="expense-logo" src={ExpenseLogo} alt="logo" />
      <div className="main-container">
        <h1>Expense Tracker</h1>
        {/* first container */}
        <div className="activities">
          {/* container to add income */}
          <div className="income-container">
            <span class="wallet-balance">
              <span>Wallet Balance: </span>
              <span class="balance-amount">₹{balance}</span>
            </span>
            <button className="addIncome-btn" onClick={handleAddIncome}>
              +Add Income
            </button>
          </div>
          {/* container to add expense */}
          <div className="expense-container">
            <span className="expense-amount">
              <span>Expenses: </span>
              <span className="expenses">₹500</span>
            </span>
            <button className="addExpense-btn" onClick={handleAddExpenses}>
              +Add Expense
            </button>
          </div>
          {/* pi chart to show the expense details*/}
          <div className="expense-chart">
            <ExpenseChart />
          </div>
        </div>

        {/* add income modal */}
        <Popup
          isOpen={isBalanceModalOpen}
          onSubmit={handleAddBalance}
          onClose={handleCloseBalanceModal}
          title="Add Balance"
          submitText="Add Balance"
          cancelText="Cancel"
        >
          <input
            type="text"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={handleIncomeAmount}
          />
        </Popup>

        {/* add expense modal */}
        <Popup
          isOpen={isExpenseModalOpen}
          //   onSubmit={handleAddBalance}
          onClose={handleExpenseCloseModal}
          title="Add Expenses"
          submitText="Add Expense"
          cancelText="Cancel"
        >
          <div className="input-cont">
            <div>
              <input
                type="text"
                placeholder="Title"
                value={incomeAmount}
                onChange={handleIncomeAmount}
              />
              <input
                type="text"
                placeholder="Select Category"
                value={incomeAmount}
                onChange={handleIncomeAmount}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Price"
                value={incomeAmount}
                onChange={handleIncomeAmount}
              />
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                value={incomeAmount}
                onChange={handleIncomeAmount}
              />
            </div>
          </div>
        </Popup>
        {/* second conatiner */}
        <div className="second-conatiner">
          <div className="recent-transaction">
            <h2>Recent Transactions</h2>
          </div>
          <div className="top-expenses">
            <h2>Top Expenses</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
