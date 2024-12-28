import { Box, Button, CircularProgress } from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import MessageContainer from "./MessageContainer";
import CreateUserModal from "../create";
import UploadInput from "./UploadInput";

const Home = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`
  );

  useEffect(() => {
    if (data && data.users) setUsers(data.users);
  }, [data]);

  const handleCloseUser = () => {
    setIsCreateUserOpen(!isCreateUserOpen);
    refetch();
  }

  if (loading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (error) {
    return (
      <MessageContainer>
        <Box>Error loading users</Box>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

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
      <CreateUserModal
        open={isCreateUserOpen}
        handleClose={handleCloseUser}
      />
    </>
  );
};

export default Home;
