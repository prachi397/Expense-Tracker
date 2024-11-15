import React, { useState } from "react";
import "./expenseTable.css";
import {
  FaPizzaSlice,
  FaGift,
  FaSuitcaseRolling,
  FaTimes,
  FaPencilAlt,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";

const ExpenseTable = ({ expenseDetails, onEdit, onDelete }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(expenseDetails.length / itemsPerPage);

  // Get current items for the page
  const currentItems = expenseDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="expense-table">
      {currentItems.length > 0 ? (
        currentItems.map((expense, index) => (
          <div key={index} className="expense-row">
            <div className="expense-icon">
              <span role="img" aria-label={expense.selectedCategory}>
                {expense.selectedCategory === "Food" && <FaPizzaSlice />}
                {expense.selectedCategory === "Entertainment" && <FaGift />}
                {expense.selectedCategory === "Travel" && <FaSuitcaseRolling />}
              </span>
            </div>
            <div className="expense-info">
              <h3>{expense.expenseTitle}</h3>
              <p>{new Date(expense.expenseDate).toLocaleDateString()}</p>
            </div>
            <div className="expenseAmount">₹{expense.expensePrice}</div>
            <div className="expense-actions">
              <button
                onClick={() =>
                  onDelete((currentPage - 1) * itemsPerPage + index)
                }
                className="delete-btn"
              >
                <FaTimes />
              </button>
              <button
                onClick={() => onEdit((currentPage - 1) * itemsPerPage + index)}
                className="edit-btn"
              >
                <FaPencilAlt />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="expenseTable-msg">No expense found</h3>
      )}

      {/* Pagination Controls */}
      {expenseDetails.length && 
       <div className="pagination">
       <button
         onClick={() => handlePageChange(currentPage - 1)}
         disabled={currentPage === 1}
         className="pagination-btn"
       >
         <FaArrowAltCircleLeft style={{ fontSize: "20px" }} />
       </button>
       <button className="page-info">{currentPage}</button>
       <button
         onClick={() => handlePageChange(currentPage + 1)}
         disabled={currentPage === totalPages}
         className="pagination-btn"
       >
         <FaArrowAltCircleRight style={{ fontSize: "20px" }} />
       </button>
     </div>}
    </div>
  );
};
export default ExpenseTable;
