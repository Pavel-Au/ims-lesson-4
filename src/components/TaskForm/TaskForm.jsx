import React, { useState, useMemo } from "react";
import { Button, Box, TextField } from "@mui/material";
import { tasksService } from "../../services/tasksService";

export const TaskForm = ({ children, submitHandler }) => {
  const defaultFormState = useMemo(() => ({ title: "", completed: false }), []);
  const [newTask, updateTitle] = useState(defaultFormState);
  const [formSubmitting, updateFormSubmittingState] = useState(false);

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
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      sx={{ mb: 2 }}
    >
      <TextField
        label="Task title"
        variant="outlined"
        size="small"
        value={newTask.title}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ ml: 3 }}
        disabled={!newTask.title || formSubmitting}
      >
        Create new
      </Button>
    </Box>
  );
};
