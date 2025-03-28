import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getApprovedTrainers } from "../redux/user/userThunk";
import FilterButton from "../components/FilterIconButton";
import FilterSidebar from "../components/FilterSideBar";
import TrainerGrid from "../components/TrainerCard";
import { Box, Container, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TrainerGridShimmer from "../components/TrainerCardShimmer";

const filters = [
  { label: "Search", type: "search" },
  {
    label: "Specialization",
    type: "autocomplete",
    options: [
      "Fitness & Nutrition",
      "Strength And Conditioning",
      "Yoga",
      "Zumba",
      "Muscle Building",
      "Injury Rehab",
      "Competition Prep",
      "Pre & Post Natal Training",
      "Diabetes management",
      "Cardio",
      "Nutrition Coaching",
    ],
  },
  {
    label: "Experience",
    type: "checkbox",
    options: ["Less than 1", "1-3", "3-5", "Greater than 5"],
  },
  {
    label: "Rating",
    type: "checkbox",
    options: ["1 stars", "2 stars", "3 stars", "4 stars", "5 stars"],
  },
  {
    label: "Gender",
    type: "checkbox",
    options: ["Male", "Female"],
  },
];

const GetTrainer: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({});
  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>(
    {}
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { trainersList, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getApprovedTrainers({ searchParams: {} }));
  }, [dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const handleTrainerDetails = (_id: string) => {
    navigate(`/trainer-details/${_id}`);
  };

  const handleSearchChange = (value: any, filterLabel: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterLabel]: value,
    }));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterLabel: string
  ) => {
    const { value, checked } = event.target;
    setFilterValues((prev) => {
      const currentValues = prev[filterLabel] || [];
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter((item: string) => item !== value);
      return { ...prev, [filterLabel]: updatedValues };
    });
  };

  const handleResetAll = () => {
    setFilterValues({});
    dispatch(getApprovedTrainers({ searchParams: {} }));
    handleCloseSidebar();
  };

  const handleSearchWithFilterTrainer = () => {
    const searchParams = { ...filterValues };
    dispatch(getApprovedTrainers({ searchParams }));
    handleCloseSidebar();
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <FilterButton onClick={toggleSidebar} />
        </Box>

        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {isSidebarOpen && (
            <FilterSidebar
              filters={filters}
              open={isSidebarOpen}
              filterValues={filterValues}
              onSearchChange={handleSearchChange}
              onCheckboxChange={handleCheckboxChange}
              onResetAll={handleResetAll}
              onApply={handleSearchWithFilterTrainer}
              onToggleFilter={(filterLabel) => {
                setOpenFilters((prev) => ({
                  ...prev,
                  [filterLabel]: !prev[filterLabel],
                }));
              }}
              onClose={handleCloseSidebar}
              openFilters={openFilters}
            />
          )}

          {isLoading ? (
            <TrainerGridShimmer />
          ) : (
            <TrainerGrid
              trainersList={trainersList}
              handleTrainerDetails={handleTrainerDetails}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default GetTrainer;
