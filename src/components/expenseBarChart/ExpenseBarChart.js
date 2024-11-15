import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "./expenseBarChart.css";

const ExpenseBarChart = ({ expenseDetails }) => {
  // Group and sum data by category
  const groupedData = expenseDetails.reduce((acc, curr) => {
    const existingCategory = acc.find(item => item.selectedCategory === curr.selectedCategory);
    const expensePrice = parseFloat(curr.expensePrice); 
    if (existingCategory) {
      existingCategory.expensePrice += expensePrice;
    } else {
      acc.push({ selectedCategory: curr.selectedCategory, expensePrice });
    }
    return acc;
  }, []);

  return (
    <div className="expense-chart-container">
      {groupedData.length > 0 ? (
        <ResponsiveContainer width="95%" height={250}>
          <BarChart
            layout="vertical"
            data={groupedData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            barSize={25}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="selectedCategory" width={100} />
            <Bar dataKey="expensePrice" fill="#8784D2" radius={[0, 20, 20, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <h3 className="expenseBarChart-msg">No expense found</h3>
      )}
    </div>
  );
};

export default ExpenseBarChart;
