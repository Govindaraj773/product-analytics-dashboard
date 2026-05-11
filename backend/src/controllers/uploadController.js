import XLSX from "xlsx";
import pool from "../config/db.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    // read uploaded excel file
    const workbook = XLSX.readFile(req.file.path);

    // get first sheet name
    const sheetName = workbook.SheetNames[0];

    // convert sheet data into json
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (let row of data) {
      console.log(row);

      // map excel fields
      const name = row.product_name;
      const category = row.category;

      // const price = Number(row.discounted_price) || 0;

      // const discount = Number(row.discount_percentage) || 0;
      const price =
        parseFloat(
          String(row.discounted_price).replace(/₹/g, "").replace(/,/g, ""),
        ) || 0;

      const discount =
        parseFloat(String(row.discount_percentage).replace("%", "")) || 0;

      const rating = Number(row.rating) || 0;

      const review = row.review_content || "";

      // validate required product fields
      if (!name || !category) {
        console.log("Skipping invalid row:", row);

        continue;
      }

      // insert product data into table
      const productResult = await pool.query(
        `
        INSERT INTO products
        (
          name,
          category,
          price,
          discount
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [name, category, price, discount],
      );

      // get inserted product id
      const productId = productResult.rows[0].id;

      // inserting review
      await pool.query(
        `
        INSERT INTO reviews
        (
          product_id,
          rating,
          review_text
        )
        VALUES ($1, $2, $3)
        `,
        [productId, rating, review],
      );
    }

    res.status(200).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};
