import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function ProductTable({ products }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 4,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>

            <TableCell>Category</TableCell>

            <TableCell>Price</TableCell>

            <TableCell>Discount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>

              <TableCell>{product.category}</TableCell>

              <TableCell>₹{product.price}</TableCell>

              <TableCell>{product.discount}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
