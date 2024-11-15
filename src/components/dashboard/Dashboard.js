import React, { useEffect, useState } from "react";
import "./dashboard.css";
import ExpenseLogo from "../../assets/ExpenseLogo.png";
import ExpenseChart from "../chart/ExpenseChart";
import Popup from "../modal/Popup";
import { useSnackbar } from "notistack";
import ExpenseTable from "../expenseTable/ExpenseTable";
import ExpenseBarChart from "../expenseBarChart/ExpenseBarChart";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [balance, setBalance] = useState(5000);
  const [incomeAmount, setIncomeAmount] = useState("");

  const categories = ["Food", "Entertainment", "Travel"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const [expenseShowPrice, setShowExpensePrice] = useState(0);

  //empty array to store object of expense details
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Save balance and expense details to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage", { balance, expenseDetails });

    localStorage.setItem("balance", JSON.stringify(balance));

    // Only save if expenseDetails has items, otherwise it will save an empty array
    if (expenseDetails.length > 0) {
      localStorage.setItem("expenseDetails", JSON.stringify(expenseDetails));
    }
  }, [balance, expenseDetails]);

  // Load data from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedExpenseDetails = localStorage.getItem("expenseDetails");

    if (storedBalance) {
      setBalance(JSON.parse(storedBalance));
    }
    if (storedExpenseDetails) {
      const parsedExpenseDetails = JSON.parse(storedExpenseDetails);
      setExpenseDetails(parsedExpenseDetails);

      // Calculate total expense
      const totalExpense = parsedExpenseDetails.reduce(
        (sum, expense) => sum + parseInt(expense.expensePrice, 10),
        0
      );
      setShowExpensePrice(totalExpense);
    }
  }, []);

  //function to set the income amount
  const handleIncomeAmount = (e) => {
    setIncomeAmount(e.target.value);
  };

  //function to open pop up upon clicking add income
  const handleAddIncome = () => {
    setIsBalanceModalOpen(true);
  };

  // function to add balance while clicking on add income button inside popup
  const handleAddBalance = (e) => {
    e.preventDefault();
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

  // function for when an category is selected
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // function to add expense title
  const handleExpenseTitle = (event) => {
    setExpenseTitle(event.target.value);
  };

  // function to add expense price
  const handleExpensePrice = (event) => {
    setExpensePrice(event.target.value);
  };

  // function to add expense date
  const handleExpenseDate = (event) => {
    setExpenseDate(event.target.value);
  };

  //function to add expense after entering the details
  const handleAddExpenseDetails = (e) => {
    e.preventDefault();
    if (parseInt(expensePrice) > balance) {
      enqueueSnackbar("Insufficient balance to add this expense!", {
        variant: "error",
      });
      return;
    }
    const expenseData = {
      expenseTitle,
      expensePrice,
      selectedCategory,
      expenseDate,
    };
    setExpenseDetails((prevExpenseDetails) => {
      let newExpenseDetails;
      if (editIndex !== null) {
        newExpenseDetails = [...prevExpenseDetails];
        newExpenseDetails[editIndex] = expenseData;
      } else {
        newExpenseDetails = [...prevExpenseDetails, expenseData];
      }
      const totalExpense = newExpenseDetails.reduce(
        (sum, expense) => sum + parseInt(expense.expensePrice, 10),
        0
      );
      setShowExpensePrice(totalExpense);
      return newExpenseDetails;
    });
    // Reduce the balance after adding the expense
    setBalance((prevBalance) => prevBalance - parseInt(expensePrice));
    setIsExpenseModalOpen(false);
    setExpenseTitle("");
    setExpensePrice("");
    setSelectedCategory("");
    setExpenseDate("");
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    // Implement delete functionality
    setExpenseDetails((prevExpenseDetails) => {
      const updatedExpenses = prevExpenseDetails.filter((_, i) => i !== index);
      const totalExpense = updatedExpenses.reduce(
        (sum, expense) => sum + parseInt(expense.expensePrice, 10),
        0
      );
      setShowExpensePrice(totalExpense);
      return updatedExpenses;
    });
  };

  const handleEdit = (index) => {
    const expense = expenseDetails[index];
    setExpenseTitle(expense.expenseTitle);
    setExpensePrice(expense.expensePrice);
    setSelectedCategory(expense.selectedCategory);
    setExpenseDate(expense.expenseDate);
    setEditIndex(index);
    setIsExpenseModalOpen(true);
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
              <span className="expenses">₹{expenseShowPrice}</span>
            </span>
            <button className="addExpense-btn" onClick={handleAddExpenses}>
              +Add Expense
            </button>
          </div>
          {/* pi chart to show the expense details*/}
          <div className="expense-chart">
            <ExpenseChart expenseDetails={expenseDetails} />
          </div>
        </div>

        {/* add income modal */}
        <Popup
          isOpen={isBalanceModalOpen}
          onClose={handleCloseBalanceModal}
          onSubmit={handleAddBalance}
          title="Add Balance"
          submitText="Add Balance"
          cancelText="Cancel"
        >
          <input
            type="text"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={handleIncomeAmount}
            required
          />
        </Popup>

        {/* add expense modal */}
        <Popup
          isOpen={isExpenseModalOpen}
          onClose={handleExpenseCloseModal}
          onSubmit={handleAddExpenseDetails}
          title="Add Expenses"
          submitText="Add Expense"
          cancelText="Cancel"
        >
          <div className="input-cont">
            <input
              type="text"
              placeholder="Title"
              value={expenseTitle}
              onChange={handleExpenseTitle}
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={expensePrice}
              onChange={handleExpensePrice}
              required
            />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={expenseDate}
              onChange={handleExpenseDate}
              required
            />
          </div>
        </Popup>
        {/* second conatiner */}
        <div className="second-conatiner">
          <div className="recent-transaction">
            <h2>Recent Transactions</h2>
            {/* table to show expense details */}
            <ExpenseTable
              expenseDetails={expenseDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <div className="top-expenses">
            <h2>Top Expenses</h2>
            <ExpenseBarChart expenseDetails={expenseDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
