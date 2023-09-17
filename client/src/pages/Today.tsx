import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DayContext } from "../context/DayContext";
import NewTaskModal from "../components/NewTaskModal";
import Checkbox from "@mui/material/Checkbox";

interface Task {
  task: string;
  completed: boolean;
}

interface DayInfo {
  day: string;
  date: string;
  link: string;
  tasks: Task[];
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
  const { days } = React.useContext<DayInfo[]>(DayContext);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
              <div
                style={{
                  display: "grid",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "300px",
                  gridTemplateColumns: "115px 2px",
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
                  {el.task}
                </Typography>
                <Checkbox color="default" sx={{ color: "lightcoral" }} />
              </div>
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
        <NewTaskModal open={open} day={day} />
      </Modal>
    </div>
  );
}

export default Today;
