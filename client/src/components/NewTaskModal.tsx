import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { DayContext } from "../context/DayContext";

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

interface SetContext {
  days: DayInfo[];
  setDays: React.Dispatch<React.SetStateAction<DayInfo[]>>;
}

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

export default function NewTaskModal({ day }: { day: string }): JSX.Element {
  const [newTask, setNewTask] = React.useState<Task>({
    task: "",
    completed: false,
  });
  //   const { days, setDays } = React.useContext(DayContext);

  const addNewTask = () => {
    const currentDay = days.map((el: DayInfo) => {
      if (el.day === day) {
        return {
          ...el,
          tasks: [...el.tasks, newTask],
        };
      }
      return el;
    });
    console.log(currentDay);
    setDays(currentDay);
  };

  const dayContextValue = React.useContext(DayContext) as SetContext;
  if (!dayContextValue) {
    return <div>Loading...</div>;
  }

  const { days, setDays } = dayContextValue;

  return (
    <div>
      <Box sx={style}>
        <TextField
          hiddenLabel
          label="Add title"
          InputProps={{
            style: {
              borderRadius: "20px",
            },
          }}
          onChange={(e) =>
            setNewTask({ ...newTask, task: e.target.value, completed: false })
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
          onClick={addNewTask}
        >
          New task
        </Button>
      </Box>
    </div>
  );
}
