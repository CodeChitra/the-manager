import React from "react";
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
} from "@mui/material";
import ModalWrapper from "../components/ModalWrapper";
import EmployeeForm from "../components/EmployeeForm";

type SortFilterType = "experience" | "age";
type SortOrderType = "asc" | "dsc";
const Employees: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortField, setSortField] =
    React.useState<SortFilterType>("experience");
  const [sortOrder, setSortOrder] = React.useState<SortOrderType>("asc");
  const [filterLocation, setFilterLocation] = React.useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleCreateEmployee = () => {};

  // Dummy employees data
  const employees = [
    {
      id: 1,
      name: "Akash Deep Chitransh",
      age: 21,
      role: "Developer",
      experience: 2,
      location: "Indore",
    },
    {
      id: 2,
      name: "Anushika Gupta",
      age: 23,
      role: "Designer",
      experience: 2,
      location: "Noida",
    },
    {
      id: 3,
      name: "Om Singh",
      age: 35,
      role: "Product Manager",
      experience: 10,
      location: "Noida",
    },
    {
      id: 4,
      name: "Ayush Badoni",
      age: 40,
      role: "QA Engineer",
      experience: 8,
      location: "hyderabad",
    },
    {
      id: 5,
      name: "Mayank Singh",
      age: 25,
      role: "Intern",
      experience: 1,
      location: "Indore",
    },
    {
      id: 6,
      name: "Kashish Shahu",
      age: 32,
      role: "DevOps Engineer",
      experience: 7,
      location: "Delhi",
    },
    {
      id: 7,
      name: "Sakshi Singh",
      age: 29,
      role: "Marketing Specialist",
      experience: 4,
      location: "Pune",
    },
    {
      id: 8,
      name: "Nancy Soni",
      age: 37,
      role: "Data Scientist",
      experience: 6,
      location: "Chennai",
    },
    {
      id: 9,
      name: "Grace Lee",
      age: 26,
      role: "UI/UX Designer",
      experience: 2,
      location: "New York",
    },
    {
      id: 10,
      name: "Hank Martin",
      age: 45,
      role: "CTO",
      experience: 12,
      location: "San Jose",
    },
    {
      id: 11,
      name: "John Doe",
      age: 30,
      role: "Developer",
      experience: 5,
      location: "New York",
    },
    {
      id: 12,
      name: "Jane Smith",
      age: 28,
      role: "Designer",
      experience: 3,
      location: "Los Angeles",
    },
  ];

  // Filter and sort employees
  const filteredEmployees = employees
    .filter((emp) =>
      emp.location.toLowerCase().includes(filterLocation.toLowerCase())
    )
    .filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const sortValue = sortOrder === "asc" ? 1 : -1;
      if (sortField in a && sortField in b) {
        return a[sortField] > b[sortField] ? sortValue : -sortValue;
      }
      return 0;
    });

  // Paginate employees
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
        <Box sx={{ display: "flex", gap: 2 }}>
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
              <MenuItem value="desc">Descending</MenuItem>
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
              {paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.age}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.experience}</TableCell>
                  <TableCell>{employee.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      <ModalWrapper
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Create Employee"
      >
        <EmployeeForm onSubmit={handleCreateEmployee} />
      </ModalWrapper>
    </Box>
  );
};

export default Employees;
