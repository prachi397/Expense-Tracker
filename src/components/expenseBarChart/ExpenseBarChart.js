import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ExpenseBarChart = () => {
  const data = [
    { name: "Entertainment", expense: 150 },
    { name: "Food", expense: 300 },
    { name: "Travel", expense: 50 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip />
        <Bar dataKey="expense" fill="#8a6af3" radius={[10, 10, 10, 10]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
