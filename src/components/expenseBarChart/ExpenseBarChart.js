import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './expenseBarChart.css';

const ExpenseBarChart = ({expenseDetails}) => {
  
  return (
    <div className="expense-chart-container">
      <ResponsiveContainer width="95%" height={250}>
        <BarChart
          layout="vertical"
          data={expenseDetails}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          barSize={25}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="selectedCategory" width={100} />
          <Bar dataKey="expensePrice" fill="#8784D2" radius={[0, 20, 20, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
