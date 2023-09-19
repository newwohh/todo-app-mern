import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

      console.log(res);
      location.reload();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "lightcoral",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
      }}
    >
      {user ? (
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            color: "lightcoral",
            border: "none",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            "&:hover": {
              backgroundColor: "white",
              border: "none",
            },
          }}
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
          <Button
            onClick={deleteMe}
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              color: "lightcoral",
              border: "none",
              "&:hover": {
                backgroundColor: "white",
                border: "none",
              },
            }}
            autoFocus
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          marginBottom: "50px",
          height: "500px",
          width: "450px",
          backgroundColor: "white",
          borderRadius: "17px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
