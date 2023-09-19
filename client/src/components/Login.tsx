import React from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  display: "flex",
  justifyContent: "center",
  borderRadius: "30px",
  height: "100px",
  alignItems: "center",
};

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
      <Box sx={style}>
        <TextField
          hiddenLabel
          label="Login/Register"
          InputProps={{
            style: {
              borderRadius: "20px",
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
          sx={{
            height: "50px",
            marginLeft: "40px",
            padding: "15px",
            backgroundColor: "lightcoral",
            color: "white",
            borderRadius: "25px",
            fontFamily: "Montserrat, sans-serif",
            "&:hover": {
              backgroundColor: "white",
              color: "lightcoral",
            },
          }}
          onClick={loginOrRegisterUser}
        >
          Create/Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;
