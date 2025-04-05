import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const useSearchFilter = () => {

  const rowsPerPage:number = 9

  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPage(1);
  };

  const handleFilterChange = (newFilters: string[]) => {
    setSelectedFilter(newFilters);
    setPage(1);
  };

  const handleFromDateChange = (newDate: Dayjs | null) => {
    if(newDate){
      setFromDate(newDate);
      setPage(1);
      }
  }

  const handleToDateChange = (newDate: Dayjs | null) => {
    console.log("to date change",newDate)
    if(newDate){
    setToDate(newDate);
    setPage(1);
    }

  }

  const handleResetDates = () => {
    setFromDate(null);
    setToDate(null);
    setPage(1);
  };


  const getQueryParams = () => {
    return {
      page,
      limit: rowsPerPage,
      search: debouncedSearchTerm,
      filters: selectedFilter,
      fromDate, 
      toDate,
    };
  };
  return {
    page,
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    rowsPerPage,
    getQueryParams,

    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
  };
};

export default useSearchFilter;
