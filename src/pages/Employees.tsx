import { FC, ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import ModalWrapper from "../components/ModalWrapper";
import axiosInstance from "../utils/axiosInstance";
import CreateEmployeeForm from "../components/CreateEmployeeForm";
import { useModalStore } from "../store";
import { useNavigate } from "react-router-dom";

type SortFilterType = "experience" | "age";
type SortOrderType = "asc" | "dsc";
const Employees: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortFilterType>("experience");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("asc");
  const [filterLocation, setFilterLocation] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { isModalOpen, setIsModalOpen } = useModalStore((store) => store);
  const navigate = useNavigate();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const { data } = useQuery({
    queryKey: [
      "employees",
      { searchTerm, sortField, sortOrder, filterLocation, page },
    ],
    queryFn: async () => {
      const url = `/employees?page=${page}&location=${filterLocation}&sortOrder=${sortOrder}&sortBy=${sortField}&search=${searchTerm}`;
      const data = await axiosInstance.get(url);
      return data;
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        height: "calc(100vh - 64px)", // Adjust for Navbar
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Employees List
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Sorting Controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: 2,
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortFilterType)}
              label="Sort By"
            >
              <MenuItem value="experience">Experience</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrderType)}
              label="Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="dsc">Descending</MenuItem>
            </Select>
          </FormControl>

          {/* Filtering Control */}
          <TextField
            label="Filter by Location"
            variant="outlined"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </Box>

        {/* Search Control */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Create Employee Button */}
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Create Employee
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.employees.map(
                (employee: {
                  _id: string;
                  name: string;
                  age: string;
                  role: string;
                  experience: number;
                  location: string;
                }) => (
                  <TableRow
                    key={employee._id}
                    onClick={() => navigate(`/employees/${employee._id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.age}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.experience}</TableCell>
                    <TableCell>{employee.location}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {data?.data.totalEmployees && (
          <Pagination
            count={Math.ceil(data?.data.totalEmployees / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        )}
      </Box>

      <ModalWrapper
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Create Employee"
      >
        <CreateEmployeeForm />
      </ModalWrapper>
    </Box>
  );
};

export default Employees;
