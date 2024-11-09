import React, { useState } from "react";
import "./dashboard.css";
import ExpenseLogo from "../../assets/ExpenseLogo.png";
import ExpenseChart from "../chart/ExpenseChart";
import Popup from "../modal/Popup";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [balance, setBalance] = useState(0);
    const [incomeAmount, setIncomeAmount] = useState('');

    //function to set the income amount
    const handleIncomeAmount = (e) =>{
        setIncomeAmount(e.target.value)
    }

  //function to open pop up upon clicking add income
  const handleAddIncome = () => {
    setIsModalOpen(true);
  };

  // function to add balance while clicking on add income button inside popup
  const handleAddBalance = () =>{
    setBalance(balance+parseInt(incomeAmount));
    handleCloseModal();
    setIncomeAmount('');
  }

  // function to close the popup
  const handleCloseModal = () =>{
    setIsModalOpen(false);
  }

  //function to add expenses
  const handleAddExpenses = () => {};
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
        isOpen={isModalOpen}
        onSubmit={handleAddBalance}
        onClose={handleCloseModal}
        title="Add Balance"
        submitText="Add Balance"
        cancelText="Cancel"
        >
            <input type="number" placeholder="Income Amount" value={incomeAmount} onChange={handleIncomeAmount}/>
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
