import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DiscountHistogram = ({ products = [] }) => {
  if (!products.length) {
    return <p>No data available</p>;
  }

  const ranges = {
    "0-10%": 0,
    "11-20%": 0,
    "21-30%": 0,
    "31-40%": 0,
    "41%+": 0,
  };

  products.forEach((p) => {
    // const discount = Number(p.discount || 0);
    const discount = Number(p.discount || 0) * 100;

    if (discount <= 10) ranges["0-10%"]++;
    else if (discount <= 20) ranges["11-20%"]++;
    else if (discount <= 30) ranges["21-30%"]++;
    else if (discount <= 40) ranges["31-40%"]++;
    else ranges["41%+"]++;
  });

  const chartData = Object.keys(ranges).map((key) => ({
    range: key,
    count: ranges[key],
  }));

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Discount Distribution</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="range" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiscountHistogram;
