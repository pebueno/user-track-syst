import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useAxios from "axios-hooks";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import MessageContainer from "../home/MessageContainer";

const UserDetails = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [user, setUser] = useState<any>();
  const { id } = useParams<{ id: string }>();

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`,
  );

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

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

  if (!user) {
    return (
      <MessageContainer>
        <Typography color="error">User not found!</Typography>
      </MessageContainer>
    );
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        User details
      </Typography>
      <Typography> ID: {user.id} </Typography>
      <Typography> First Name: {user.first_name} </Typography>
      <Typography> Last Name: {user.last_name} </Typography>
      <Typography> email: {user.email} </Typography>
      <Typography> Birthday: {user.birthday} </Typography>
    </Box>
  );
};

export default UserDetails;
