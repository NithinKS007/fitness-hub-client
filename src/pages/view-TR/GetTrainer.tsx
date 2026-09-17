import React from "react";
import {
  Box,
  Container,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import FilterButton from "../../components/FilterIconButton";
import FilterSidebar from "../../components/FilterSideBar";
import TrainerGridShimmer from "../../components/trainer-card/TrainerCardShimmer";
import SearchIcon from "@mui/icons-material/Search";
import PaginationTable from "../../components/Pagination";
import ReuseSort from "../../components/Sort";
import Error from "../../components/shared/Error";
import TrainerCard from "../../components/trainer-card/TrainerCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getApprovedTrainers } from "../../redux/user/userThunk";
import { Sort } from "../../types/tableTypes";

export interface FilterValues {
  Specialization?: string[];
  Experience?: string[];
  Gender?: string[];
}

export interface Filter {
  label: string;
  options: string[];
}

const filters: Filter[] = [
  {
    label: "Specialization",
    options: [
      "Fitness & Nutrition",
      "Strength And Conditioning",
      "Yoga",
      "Zumba",
      "Muscle Building",
      "Injury Rehab",
      "Competition Prep",
      "Pre & Post Natal Training",
      "Cardio",
      "Nutrition Coaching",
    ],
  },
  {
    label: "Experience",

    options: ["Less than 1", "1-3", "3-5", "Greater than 5"],
  },
  {
    label: "Gender",

    options: ["Male", "Female"],
  },
];

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
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    cursor: "pointer",
    justifyContent: "flex-start",
    width: "100%",
  },
  trainerBox: {
    width: { xs: "100%", sm: "48%", md: "31%", lg: "24%" },
    display: "flex",
    justifyContent: "center",
  },
  noTrainersBox: {
    width: "100%",
    height: "100vh",
  },
  noTrainersText: {
    marginTop: "20px",
    textAlign: "center",
  },
};

const GetTrainer: React.FC = () => {
  const sortOptions: Sort[] = [{ value: "aA - zz" }, { value: "zz - aa" }];

  const rowsPerPage: number = 12;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sortValue, setSortValue] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { trainersList, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getApprovedTrainers({ page: 1, limit: rowsPerPage }));
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setDebouncedSearchTerm(searchTerm);
        setFilterValues((prev) => ({ ...prev, Search: searchTerm }));
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      getApprovedTrainers({
        search: debouncedSearchTerm,
        page: page,
        limit: rowsPerPage,
        sort: sortValue,
      })
    );
  }, [debouncedSearchTerm, page, dispatch, sortValue]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    console.log("event", event);
    setPage(newPage);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const handleTrainerDetails = (id: string) => {
    navigate(`/trainer-details/${id}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterLabel: keyof FilterValues
  ) => {
    const { value, checked } = event.target;
    setFilterValues((prev) => {
      const currentValues = prev[filterLabel] || [];
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues?.filter((item: string) => item !== value);
      return { ...prev, [filterLabel]: updatedValues };
    });
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    setPage(1);
  };

  const handleResetAll = () => {
    setFilterValues({});
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSortValue("");
    setPage(1);
    dispatch(getApprovedTrainers({ page: 1, limit: rowsPerPage }));
    handleCloseSidebar();
  };

  const handleSearchWithFilterTrainer = () => {
    const transformedFilterValues = Object.entries(filterValues).reduce(
      (acc: { [key: string]: string[] }, [key, value]) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        acc[newKey] = value;
        return acc;
      },
      {}
    );
    setPage(1);
    dispatch(
      getApprovedTrainers({
        ...transformedFilterValues,
        search: debouncedSearchTerm,
        page: 1,
        limit: rowsPerPage,
        sort: sortValue,
      })
    );
    handleCloseSidebar();
  };

  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.user.pagination
  );

  if (error)
    return (
      <>
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center text-xl text-red-600">
            <Error message={error} />;
          </div>
        </div>
      </>
    );

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
            sortValue={sortValue}
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
              <Box sx={styles.gridContainer}>
                {trainersList && trainersList.length > 0 ? (
                  trainersList.map((trainer) => (
                    <Box key={trainer.id} sx={styles.trainerBox}>
                      <TrainerCard
                        trainer={trainer}
                        handleTrainerDetails={handleTrainerDetails}
                      />
                    </Box>
                  ))
                ) : (
                  <Box sx={styles.noTrainersBox}>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={styles.noTrainersText}
                    >
                      No Trainers Found
                    </Typography>
                  </Box>
                )}
              </Box>
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
