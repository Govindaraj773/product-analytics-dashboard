import pool from "../config/db.js";

// 1. Products Per Category
export const getProductsPerCategory = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          category,
          COUNT(*) AS count
        FROM products
        GROUP BY category
        ORDER BY count DESC
        `,
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch products per category",
    });
  }
};

// 2. Top Reviewed Products
export const getTopReviewedProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          p.name,
          COUNT(r.id) AS total_reviews
        FROM products p
        JOIN reviews r
          ON p.id = r.product_id
        GROUP BY p.name
        ORDER BY total_reviews DESC
        LIMIT 10
        `,
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch top reviewed products",
    });
  }
};

// 3. Category Wise Average Rating
export const getCategoryAverageRating = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          p.category,
          ROUND(
            AVG(r.rating),
            2
          ) AS average_rating
        FROM products p
        JOIN reviews r
          ON p.id = r.product_id
        GROUP BY p.category
        ORDER BY average_rating DESC
        `,
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch category ratings",
    });
  }
};
