import React from "react";
import "./expenseTable.css";
import { FaPizzaSlice, FaGift, FaSuitcaseRolling, FaTimes, FaPencilAlt} from "react-icons/fa";

const ExpenseTable = ({ expenseDetails, onEdit, onDelete }) => {
  return (
      <div className="expense-table">
        {expenseDetails.length>0 ? expenseDetails.map((expense, index) => (
          <div key={index} className="expense-row">
            <div className="expense-icon">
              {/* Icon based on category */}
              <span role="img" aria-label={expense.selectedCategory}>
                {expense.selectedCategory === "Food" && <FaPizzaSlice />}
                {expense.selectedCategory === "Entertainment" && <FaGift/>}
                {expense.selectedCategory === "Travel" && <FaSuitcaseRolling />}
              </span>
            </div>
            <div className="expense-info">
              <h3>{expense.expenseTitle}</h3>
              <p>{new Date(expense.expenseDate).toLocaleDateString()}</p>
            </div>
            <div className="expenseAmount">₹{expense.expensePrice}</div>
            <div className="expense-actions">
            <button onClick={() => onDelete(index)} className="delete-btn"><FaTimes/></button>
            <button onClick={() => onEdit(index)} className="edit-btn"><FaPencilAlt/></button>
          </div>
          </div>
        )):
        <h3 className="expenseTable-msg">No expense found</h3>}
      </div>
  );
};
export default ExpenseTable;
