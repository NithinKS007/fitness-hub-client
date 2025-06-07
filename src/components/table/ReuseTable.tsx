import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface TableColumn {
  label: string;
  field: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
}

const ReuseTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <>
      <TableContainer
        sx={{
          border: "1px solid lightgrey",
          borderRadius: 2,
          bgcolor: "white",
          maxHeight: "900px",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{ padding: " 8px", fontWeight: "600" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.field} sx={{ padding: "8px" }}>
                    {row[column.field] != null ? row[column.field] : "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReuseTable;
