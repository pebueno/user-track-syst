import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import UsersTable from "./UsersTable";
import CreateUserModal from "../create";
import UploadInput from "./UploadInput";
import { useUsers } from "../contexts/UsersContext";

const Home = () => {
  const {users, fetchUsers} = useUsers();
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const handleCloseUser = () => {
    setIsCreateUserOpen(!isCreateUserOpen);
    fetchUsers();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <UploadInput />
        <Button variant="contained" onClick={() => setIsCreateUserOpen(true)}>
          Create User
        </Button>
      </Box>
      <UsersTable users={users} />
      <CreateUserModal open={isCreateUserOpen} handleClose={handleCloseUser} />
    </>
  );
};

export default Home;
