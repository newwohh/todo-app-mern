import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Today({ day }: { day: string }) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3">{day}</Typography>
        <Typography></Typography>
      </div>
      <Link to="/monday">CLick</Link>
    </div>
  );
}

export default Today;
