import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { startButton } from "../styles/styles";

function Start() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate: Date = new Date();
  const currentDayOfWeek: number = currentDate.getDay();
  const currentDayName = daysOfWeek[currentDayOfWeek];

  const navigation = useNavigate();

  return (
    <div>
      <Typography
        variant="h4"
        data-testid="welcome-message"
        sx={{
          fontWeight: 1000,
          fontSize: "30px",
          color: "lightcoral",
          marginBottom: "10px",
        }}
      >
        Start Your Day Strong!
      </Typography>
      <Button
        data-testid="start-button"
        sx={startButton}
        onClick={() => navigation(`/${currentDayName}`)}
      >
        Start your day
      </Button>
    </div>
  );
}

export default Start;
