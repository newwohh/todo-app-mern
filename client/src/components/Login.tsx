import React from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginButtonStyles, loginContainerStyle } from "../styles/styles";

interface User {
  username: string;
  id?: string;
}

function Login() {
  const [username, setUsername] = React.useState<User>({
    username: "",
  });
  const navigation = useNavigate();

  const loginOrRegisterUser = async () => {
    try {
      const response = await axios.post(
        "https://dailydo.onrender.com/api/todo/createtodo",
        {
          username: username.username,
        }
      );
      console.log(response.data.data.user._id);
      navigation("/");
      localStorage.setItem("user", JSON.stringify(response.data.data.user._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box sx={loginContainerStyle}>
        <TextField
          data-testid="username"
          hiddenLabel
          label="Login/Register"
          InputProps={{
            style: {
              borderRadius: "20px",
              borderColor: "red",
            },
          }}
          onChange={(e) =>
            setUsername({
              ...username,
              username: e.target.value,
            })
          }
        />
        <Button
          data-testid="login-button"
          sx={loginButtonStyles}
          onClick={loginOrRegisterUser}
        >
          Create/Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;
