import React from "react";
import axios from "axios";
import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewTaskModal from "../components/NewTaskModal";
import Checkbox from "@mui/material/Checkbox";
import { AuthContext } from "../context/AuthContext";
import Login from "../components/Login";
// import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DayContext } from "../context/DayContext";

interface Tasks {
  title: string;
  day: string;
  completed: boolean;
  _id: string;
}

interface Task {
  day: string;
  title: string;
  completed: boolean;
}

interface TodayProps {
  day: string;
  date: string;
  tasks: Tasks[];
}

interface DayInfo {
  day: string;
  date: string;
  link: string;
  tasks: Task[];
}
interface SetContext {
  days: DayInfo[];
  setDays: React.Dispatch<React.SetStateAction<DayInfo[]>>;
}
interface SetAuthContext {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}
function Today({ day, date, tasks }: TodayProps): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const dayContextValue = React.useContext(DayContext) as SetContext;
  const authContextValue = React.useContext(AuthContext) as SetAuthContext;
  if (!dayContextValue) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (authContextValue === undefined) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const { days, setDays } = dayContextValue;
  const { user } = authContextValue;

  const deleteTask = async (obj: Tasks) => {
    try {
      const userId = JSON.parse(user as string);
      const deleteUrl = "https://dailydo.onrender.com/api/todo/deleteTask";
      const res = await axios.put(deleteUrl, { userId, taskTitle: obj.title });

      console.log(res);
      let arrTodos = [];

      // console.log(currentDay);

      const storedTodosJSON = localStorage.getItem("todos");
      if (storedTodosJSON) {
        arrTodos = JSON.parse(storedTodosJSON);
      }
      const updatedArr = arrTodos.filter((el: Tasks) => el.title !== obj.title);
      const currentDay = days.map((el: DayInfo) => {
        if (el.day === day) {
          return {
            ...el,
            tasks: updatedArr,
          };
        }
        return el;
      });
      setDays(currentDay);
      localStorage.setItem("todos", JSON.stringify(updatedArr));
    } catch (error) {
      error;
    }
  };

  const handleOpen = async () => {
    if (user) {
      setOpen(true);
      // console.log(userNew);
    } else if (!user) {
      setOpenLogin(true);
    }
  };

  const handleClose = () => setOpen(false);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: 1000 }}
        >
          {day}
        </Typography>
        <Typography
          sx={{
            marginTop: "10px",
            color: "grey",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "18px",
          }}
        >
          {date.split(",")[0] + " " + date.split(",")[1]}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          {tasks.map((el, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                key={i}
                style={{
                  display: "grid",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "300px",
                  gridTemplateColumns: "130px 2px",
                }}
              >
                <Typography
                  key={i}
                  sx={{
                    color: "grey",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "18px",
                    marginRight: "40px",
                  }}
                >
                  {el?.title}
                </Typography>
                {el?.title ? (
                  <Checkbox
                    color="default"
                    disabled={el.completed}
                    sx={{ color: "lightcoral" }}
                    onChange={() => deleteTask(el)}
                  />
                ) : (
                  ""
                )}
              </motion.div>
            );
          })}
        </div>
        <Button
          startIcon={<AddIcon />}
          sx={{
            padding: "15px",
            width: "140px",
            backgroundColor: "lightcoral",
            color: "white",
            borderRadius: "25px",
            fontFamily: "Montserrat, sans-serif",
            "&:hover": {
              backgroundColor: "white",
              color: "lightcoral",
            },
          }}
          onClick={handleOpen}
        >
          New task
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewTaskModal
          day={day}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        />
      </Modal>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Login />
      </Modal>
    </motion.div>
  );
}

export default Today;
