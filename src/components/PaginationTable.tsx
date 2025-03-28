import React from "react";
import { Pagination, Stack } from "@mui/material";

interface PaginationTableProps {
  handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  page: number;
  totalPages: number;
  disabled?: boolean;
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  handlePageChange,
  page,
  totalPages,
  disabled = false,
}) => (
  <Stack spacing={2} sx={{ mt: 2 }} direction="row" justifyContent="end">
    <Pagination
      count={totalPages}
      page={page} 
      onChange={handlePageChange}
      shape="rounded"
      size="medium"
      disabled={disabled}
    />
  </Stack>
);

export default PaginationTable;