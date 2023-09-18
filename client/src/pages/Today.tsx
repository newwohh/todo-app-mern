import React from "react";
import axios from "axios";
import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewTaskModal from "../components/NewTaskModal";
import Checkbox from "@mui/material/Checkbox";
import { AuthContext } from "../context/AuthContext";
import Login from "../components/Login";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface Tasks {
  title: string;
  day: string;
  completed: boolean;
  _id: string;
}

interface TodayProps {
  day: string;
  date: string;
  tasks: Tasks[];
}

function Today({ day, date, tasks }: TodayProps): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  // const [checked, setChecked] = React.useState(true);
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const { user } = React.useContext(AuthContext);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  const deleteTask = async (id) => {
    try {
      const userId = JSON.parse(user);
      const deleteUrl = "http://localhost:5050/api/todo/deleteTask";
      const res = await axios.put(deleteUrl, { userId, taskId: id });
      console.log(res);
    } catch (error) {
      console.log(error);
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
  const fetchTodo = async () => {
    try {
      const userId = JSON.parse(user);
      const todoData = await axios.get(
        `http://localhost:5050/api/todo/tasks/${userId}`
      );
      // setDays(...days)
      return todoData;
      console.log(todoData);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodo(),
  });

  if (isLoading) {
    return (
      <div>
        <CircularProgress sx={{ color: "lightcoral" }} />
      </div>
    );
  }

  const allTasks = data?.data.data.tasks;
  console.log(allTasks, tasks);

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
                <Checkbox
                  color="default"
                  sx={{ color: "lightcoral" }}
                  // checked={el.completed}
                  // onChange={handleChange}
                  onClick={() => deleteTask(el._id)}
                />
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
