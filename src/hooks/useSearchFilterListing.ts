import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getApprovedTrainers } from "../redux/user/userThunk";
import { Sort } from "../types/tableTypes";
export interface FilterValues {
  Specialization?: string[];
  Experience?: string[];
  Gender?: string[];
  
}

export interface Filter {
  label: string;
  options: string[];
}

const filters:Filter[] = [
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
      "Diabetes management",
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
]


const sortOptions: Sort[] = [{ value: "aA - zz" }, { value: "zz - aa" }];

export const useSearchFilterListing = () => {
  const rowsPerPage: number = 12;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>({})
  const [sortValue,setSortValue] = useState<string>("")


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
      if(searchTerm){
        setDebouncedSearchTerm(searchTerm);
        setFilterValues((prev) => ({ ...prev, Search:searchTerm }));
      }
    }, 700); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getApprovedTrainers({
      Search: debouncedSearchTerm,
      page:page as number,
      limit: rowsPerPage,
      sort: sortValue,
    }));
  }, [debouncedSearchTerm, page, dispatch,sortValue]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    console.log("event",event)
    setPage(newPage);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const handleTrainerDetails = (_id: string) => {
    navigate(`/trainer-details/${_id}`);
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
      const currentValues = prev[filterLabel] || [] ;
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues?.filter((item: string) => item !== value);
      return { ...prev, [filterLabel]: updatedValues };
    });
  };

  const handleSortChange = (value:string) =>{
    setSortValue(value)
    setPage(1);
  }

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
    setPage(1); 
    dispatch(
      getApprovedTrainers({
        ...filterValues,
        Search: debouncedSearchTerm,
        page: 1,
        limit: rowsPerPage,
        sort: sortValue,
      })
    );
    handleCloseSidebar();
  };

  return {
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
  };
};
export default useSearchFilterListing