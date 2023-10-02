import React, { useState, useMemo, useRef } from "react";
import { Button, Box, TextField } from "@mui/material";
import { tasksService } from "../../services/tasksService";
import "./TaskForm.sass";

export const TaskForm = ({ children, submitHandler }) => {
  const defaultFormState = useMemo(() => ({ title: "", completed: false }), []);
  const [newTask, updateTitle] = useState(defaultFormState);
  const [formSubmitting, updateFormSubmittingState] = useState(false);
  const textInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateFormSubmittingState(true);

    await tasksService
      .post(newTask)
      .then(() => {
        updateTitle(defaultFormState);
      })
      .finally(() => {
        submitHandler();
        updateFormSubmittingState(false);
      });
  };

  const handleChange = (e) => {
    updateTitle({ ...newTask, title: e.target.value });
    if (e.target.value.trim().length < 4) {
      textInput.current.classList.add("validation-notification");
    } else {
      textInput.current.classList.remove("validation-notification");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      sx={{ mb: 5 }}
    >
      <TextField
        label="Task title"
        variant="outlined"
        size="small"
        value={newTask.title}
        onChange={handleChange}
        ref={textInput}
        sx={{ width: "50%" }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ ml: 3 }}
        disabled={
          !newTask.title || newTask.title.trim().length < 4 || formSubmitting
        }
      >
        Create new
      </Button>
    </Box>
  );
};
