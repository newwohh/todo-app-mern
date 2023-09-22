export const container: React.CSSProperties = {
  backgroundColor: "lightcoral",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column-reverse",
};

export const deleteButtonStyles = {
  backgroundColor: "white",
  borderRadius: "20px",
  color: "lightcoral",
  border: "none",
  "&:hover": {
    backgroundColor: "white",
    border: "none",
  },
};

export const userButtonStyles = {
  backgroundColor: "white",
  borderRadius: "20px",
  color: "lightcoral",
  border: "none",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  "&:hover": {
    backgroundColor: "white",
    border: "none",
  },
};

export const childContainer: React.CSSProperties = {
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
};

export const loginContainerStyle = {
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

export const loginButtonStyles = {
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
};

export const newTaskButton = {
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
};

export const startButton = {
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
};

export const newTaskButton2 = {
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
};

export const todayContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "20px",
  flexDirection: "column",
};
