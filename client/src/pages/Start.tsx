import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        sx={{
          height: "50px",
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
        onClick={() => navigation(`/${currentDayName}`)}
      >
        Start your day
      </Button>
    </div>
  );
}

export default Start;
