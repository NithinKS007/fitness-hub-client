import React from "react";
import {
  Box,
  Container,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import FilterButton from "../components/FilterIconButton";
import FilterSidebar from "../components/FilterSideBar";
import TrainerGrid from "../components/TrainerCard";
import TrainerGridShimmer from "../components/TrainerCardShimmer";
import useSearchFilterListing from "../hooks/useSearchFilterListing";
import SearchIcon from "@mui/icons-material/Search";
import PaginationTable from "../components/PaginationTable";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import ReuseSort from "../components/Sort";
import Error from "../components/Error";

const styles = {
  container: { py: 4 },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "0 16px",
  },
  textField: {
    flexGrow: 1,
    maxWidth: 500,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  searchIcon: { color: "#14b8a6" },
  sortFilterBox: { display: "flex", gap: 2 },
  divider: { my: 3 },
  mainContent: { display: "flex", flexDirection: { xs: "column", md: "row" } },
  trainerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 2,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

const GetTrainer: React.FC = () => {
  const {
    filters,
    isSidebarOpen,
    filterValues,
    openFilters,
    trainersList,
    isLoading,
    error,
    toggleSidebar,
    handleCloseSidebar,
    handleTrainerDetails,
    handleSearchChange,
    handleCheckboxChange,
    handleResetAll,
    handleSearchWithFilterTrainer,
    setOpenFilters,
    handlePageChange,
    searchTerm,
    handleSortChange,
    sortValue,
    sortOptions,
  } = useSearchFilterListing();

  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.user.pagination
  );

  if (error) return <Error message={error} />;

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Box sx={styles.headerBox}>
        <Box sx={styles.searchContainer}>
          <TextField
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            variant="outlined"
            placeholder="Search..."
            sx={styles.textField}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={styles.searchIcon} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box sx={styles.sortFilterBox}>
          <ReuseSort
            onChange={handleSortChange}
            sortValue={sortValue as string}
            sortOption={sortOptions}
          />
          <FilterButton onClick={toggleSidebar} />
        </Box>
      </Box>
      <Divider sx={styles.divider} />
      <Box sx={styles.mainContent}>
        {isSidebarOpen && (
          <FilterSidebar
            filters={filters}
            open={isSidebarOpen}
            filterValues={filterValues}
            onCheckboxChange={handleCheckboxChange}
            onResetAll={handleResetAll}
            onApply={handleSearchWithFilterTrainer}
            onToggleFilter={(filterLabel) =>
              setOpenFilters((prev) => ({
                ...prev,
                [filterLabel]: !prev[filterLabel],
              }))
            }
            onClose={handleCloseSidebar}
            openFilters={openFilters}
          />
        )}
        {isLoading ? (
          <TrainerGridShimmer />
        ) : (
          <>
            <Box sx={styles.trainerContainer}>
              <TrainerGrid
                trainersList={trainersList}
                handleTrainerDetails={handleTrainerDetails}
              />
              <Box sx={styles.paginationContainer}>
                <PaginationTable
                  handlePageChange={handlePageChange}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default GetTrainer;
