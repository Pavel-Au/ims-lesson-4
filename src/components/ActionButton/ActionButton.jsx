import React from "react";
import Button from "@mui/material/Button";

export const ActionButton = ({ children, actionHandler, disabled }) => {
  return (
    <>
      {actionHandler ? (
        <Button
          disabled={disabled}
          onClick={actionHandler}
          variant="contained"
          sx={{ m: 2 }}
        >
          {children}
        </Button>
      ) : null}
    </>
  );
};
