import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";

interface TableColumn {
  label: string;
  field: string;
}

interface ShimmerTableProps {
  columns: TableColumn[];
}

const ShimmerTableLoader: React.FC<ShimmerTableProps> = ({ columns }) => {
  return (
    <Table
      sx={{ border: "1px solid lightgrey ", borderRadius: 2, bgcolor: "white" }}
    >
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" sx={{ padding: "8px" }}>
            <Skeleton variant="rectangular" width={24} height={24} />
          </TableCell>
          {columns.map((column) => (
            <TableCell key={column.field} sx={{ padding: "8px" }}>
              <Skeleton variant="text" width="60%" />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell padding="checkbox" sx={{ padding: "8px" }}>
              <Skeleton variant="rectangular" width={24} height={24} />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ padding: "8px" }}>
                <Skeleton variant="text" width="80%" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShimmerTableLoader;
