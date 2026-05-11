// import pool from "../config/db.js";

// export const getProducts = async (req, res) => {
//   try {
//     // below are query params
//     const page = parseInt(req.query.page) || 1;

//     const limit = parseInt(req.query.limit) || 10;

//     const search = req.query.search || "";

//     const category = req.query.category || "";

//     // for pagination calculation
//     const offset = (page - 1) * limit;

//     // for base query
//     let query = `
//       SELECT *
//       FROM products
//       WHERE 1=1
//     `;

//     let values = [];

//     let count = 1;

//     // search filter
//     if (search) {
//       query += `
//         AND name ILIKE $${count}
//       `;

//       values.push(`%${search}%`);

//       count++;
//     }

//     // category filter
//     if (category) {
//       query += `
//         AND category ILIKE $${count}
//       `;

//       values.push(`%${category}%`);

//       count++;
//     }

//     // pagination
//     query += `
//       LIMIT $${count}
//       OFFSET $${count + 1}
//     `;

//     values.push(limit, offset);

//     // execute the query
//     const result = await pool.query(query, values);

//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       error: "Failed to fetch products",
//     });
//   }
// };

import pool from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";

    const category = req.query.category || "";

    const offset = (page - 1) * limit;

    let query = `
      SELECT *
      FROM products
      WHERE 1=1
    `;

    let values = [];

    let count = 1;

    if (search) {
      query += `
        AND name ILIKE $${count}
      `;

      values.push(`%${search}%`);

      count++;
    }

    if (category) {
      query += `
        AND category ILIKE $${count}
      `;

      values.push(`%${category}%`);

      count++;
    }

    query += `
      LIMIT $${count}
      OFFSET $${count + 1}
    `;

    values.push(limit, offset);

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

export const getProductsPerCategory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT category, COUNT(*) AS count
      FROM products
      GROUP BY category
      ORDER BY count DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch category analytics",
    });
  }
};
