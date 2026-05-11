import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

import api from "./services/api";

import ProductTable from "./components/ProductTable";
import CategoryChart from "./components/CategoryChart";
import FileUpload from "./components/FileUpload";
import TopReviewedChart from "./components/TopReviewedChart";
import DiscountHistogram from "./components/DiscountHistogram";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [chartData, setChartData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setError("");
      const response = await api.get(
        `/products?page=${page}&limit=10&search=${search}`,
      );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await api.get("/analytics/products-per-category");

      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchChartData();
  }, [page, search]);

  const totalProducts = products.length;

  const totalCategories = new Set(products.map((product) => product.category))
    .size;

  const averagePrice =
    products.length > 0
      ? (
          products.reduce(
            (sum, product) => sum + Number(product.price || 0),
            0,
          ) / products.length
        ).toFixed(2)
      : 0;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>Product Analytics Dashboard</h1>
      <FileUpload onUploadSuccess={fetchProducts} />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setPage(1);

          setSearch(e.target.value);
        }}
        style={{
          padding: "12px",
          width: "350px",
          marginBottom: "30px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* reset button */}
      <button
        onClick={() => {
          setSearch("");
          setPage(1);
        }}
        style={{
          marginLeft: "10px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>

      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>

              <Typography variant="h4">{totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Categories</Typography>

              <Typography variant="h4">{totalCategories}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Price</Typography>

              <Typography variant="h4">₹{averagePrice}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {/* {loading ? <p>Loading...</p> : <ProductTable products={products} />} */}

      {loading ? (
        // <p>Loading...</p>
        <div
          style={{
            padding: "30px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Loading Products...
        </div>
      ) : (
        <>
          <div
            style={{
              marginTop: "40px",
            }}
          >
            <h2>Products List</h2>
          </div>
          <ProductTable products={products} />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={products.length < 10}
            >
              Next
            </button>
            <span>Page {page}</span>
          </div>

          {/* No products found */}
          {products.length === 0 && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              No products found
            </p>
          )}

          <TopReviewedChart products={products} />

          <DiscountHistogram products={products} />

          <div
            style={{
              marginTop: "50px",
            }}
          >
            <h2>Category Analytics</h2>

            <CategoryChart chartData={chartData} />
          </div>
        </>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "gray",
          backgroundColor: "#f0f0f0",
          padding: "15px",
          width: "100%",
        }}
      >
        Product Analytics Dashboard © 2026
      </div>
    </div>
  );
}

export default App;
