import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

const PaginationTable = () => {
  const [page, setPage] = React.useState(2);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={10}  
      rowsPerPageOptions={[]}
    />
  );
};

export default PaginationTable;
