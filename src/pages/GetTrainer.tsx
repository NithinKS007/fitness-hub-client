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
    sortOptions
  } = useSearchFilterListing();

  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.user.pagination
  );

  if (error) return <div>{error}</div>;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          value={searchTerm}
          onChange={(event) => handleSearchChange(event.target.value)}
          variant="standard"
          placeholder="Search...."
          sx={{
            flexGrow: 1,
            maxWidth: 400,
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <ReuseSort onChange={handleSortChange} sortValue={sortValue} sortOption={sortOptions} />
          <FilterButton onClick={toggleSidebar} />
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <TrainerGrid
                trainersList={trainersList}
                handleTrainerDetails={handleTrainerDetails}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
