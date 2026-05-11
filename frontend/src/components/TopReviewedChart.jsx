// import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TopReviewedChart = ({ products = [] }) => {
  if (!products.length) {
    return <p>No review data available</p>;
  }

  // Generate temporary review counts
  const chartData = products
    .map((product) => ({
      ...product,

      reviewCount: Math.floor(Math.random() * 5000) + 100,
    }))

    .sort((a, b) => b.reviewCount - a.reviewCount)

    .slice(0, 10);

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>Top Reviewed Products</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" hide />

          <YAxis />

          <Tooltip />

          <Bar dataKey="reviewCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopReviewedChart;
