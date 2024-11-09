import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Food", value: 720 },
  { name: "Entertainment", value: 360 },
  { name: "Travel", value: 120 }
];

const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function ExpenseChart() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="rect"
          iconSize={20}
          formatter={(value, entry) => <span style={{ color: "white" }}>{entry.value}</span>}
        />
    </PieChart>
  );
}
export default ExpenseChart;