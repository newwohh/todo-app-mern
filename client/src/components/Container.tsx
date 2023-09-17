import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "lightcoral",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "500px",
          width: "450px",
          backgroundColor: "white",
          borderRadius: "17px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
