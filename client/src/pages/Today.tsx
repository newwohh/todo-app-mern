import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DayContext } from "../context/DayContext";
import NewTaskModal from "../components/NewTaskModal";

interface Task {
  task: string;
  completed: boolean;
}

function Today({
  day,
  date,
  tasks,
}: {
  day: string;
  date: string;
  tasks: Task[];
}) {
  const { days } = React.useContext(DayContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(days);

  const todayData = days.filter((el: any) => {
    return el.day === day;
  });

  const todayTasks = todayData[0].tasks;
  console.log(todayTasks);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
        <div>
          {todayTasks.map((el, i) => {
            return (
              <Typography
                key={i}
                sx={{
                  color: "grey",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "18px",
                }}
              >
                {el.task}
              </Typography>
            );
          })}
        </div>
        <Button
          startIcon={<AddIcon />}
          sx={{
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
        <NewTaskModal open={open} day={day} />
      </Modal>
    </div>
  );
}

export default Today;
