import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import useAxios from "axios-hooks";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import MessageContainer from "../home/MessageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`,
  );

  const [{ loading: updating }, executePut] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`,
      method: "PUT",
    },
    { manual: true },
  );

  const [user, setUser] = useState<any>();

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

  const handleSave = async () => {
    try {
      await executePut({ data: user });
      alert("User updated successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to update user");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "80px auto",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1);",
        backgroundColor: "white",
      }}
    >
      <IconButton
        onClick={() => navigate("/")}
        aria-label="back"
        sx={{ marginBottom: "16px" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
      />
      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <TextField
        label="email"
        fullWidth
        margin="normal"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <TextField
        label="Birthday"
        fullWidth
        margin="normal"
        value={user.birthday}
        onChange={(e) => setUser({ ...user, birthday: e.target.value })}
      />

      <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
        {updating ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
};

export default UserDetails;
