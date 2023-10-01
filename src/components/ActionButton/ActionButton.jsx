import React from "react";
import Button from "@mui/material/Button";

export const ActionButton = ({ children, actionHandler }) => {
  return (
    <>
      {actionHandler ? (
        <Button onClick={actionHandler} variant="contained" sx={{ m: 1 }}>
          {children}
        </Button>
      ) : null}
    </>
  );
};
