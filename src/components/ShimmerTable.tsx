import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Skeleton } from "@mui/material";

interface TableColumn {
  label: string;
  field: string;
}

interface ShimmerTableLoaderProps {
  columns: TableColumn[];
}

const ShimmerTableLoader: React.FC<ShimmerTableLoaderProps> = ({ columns }) => {
  return (
    <TableContainer component={Card}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Skeleton variant="circular" width={24} height={24} />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field}>
                <Skeleton variant="text" width="130%" />
              </TableCell>
            ))}
            <TableCell>
              <Skeleton variant="rectangular" width={100} height={30} />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Skeleton variant="circular" width={24} height={24} />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  <Skeleton variant="text" width="130%" />
                </TableCell>
              ))}
              <TableCell>
                <Skeleton variant="rectangular" width={100} height={30} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShimmerTableLoader;
