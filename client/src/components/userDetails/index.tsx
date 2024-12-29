import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import MessageContainer from "../home/MessageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUsers } from "../contexts/UsersContext";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateUser, getUserById } = useUsers();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const user = getUserById(Number(id));
    if (user) setUser(user);
  }, [id, getUserById]);

  if (!user) {
    return (
      <MessageContainer>
        <Typography color="error">User not found!</Typography>
      </MessageContainer>
    );
  }

  const handleSave = async () => {
    if (user) {
      await updateUser(user);
      alert("User updated successfully!");
      navigate("/");
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
        Save Changes
      </Button>
    </Box>
  );
};

export default UserDetails;
