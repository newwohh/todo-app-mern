import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  childContainer,
  container,
  deleteButtonStyles,
  userButtonStyles,
} from "../styles/styles";

interface SetAuthContext {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

function Container({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const authContextValue = React.useContext(AuthContext) as SetAuthContext;
  const { user } = authContextValue;
  const navigation = useNavigate();
  const id = JSON.parse(user);
  console.log(id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("todos");
    navigation("/");
  };

  const deleteMe = async () => {
    try {
      const res = await axios.delete(
        "https://dailydo.onrender.com/api/todo/deleteUser",
        {
          data: { id: id },
        }
      );

      navigation("/");
      console.log(res);
      localStorage.removeItem("user");
      localStorage.removeItem("todos");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div style={container}>
      {user ? (
        <Button
          variant="outlined"
          sx={userButtonStyles}
          onClick={handleClickOpen}
        >
          User
        </Button>
      ) : (
        ""
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions sx={{ padding: "20px", borderRadius: "60px" }}>
          <Button onClick={logout}>Logout</Button>
          <Button onClick={deleteMe} sx={deleteButtonStyles} autoFocus>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      <div style={childContainer}>{children}</div>
    </div>
  );
}

export default Container;
