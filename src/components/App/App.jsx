import React from "react";
import { ListContainer, TaskForm } from "../index";
import { ERROR_MESSAGE } from "../../constants/messages";
import { Container, Grid } from "@mui/material";
import { useTaskList } from "../../hooks/useTaskList";

export const App = () => {
  const { state, updateStatus, removeItem, refreshList } = useTaskList();

  return (
    <Container maxWidth="md">
      <TaskForm submitHandler={refreshList}></TaskForm>
      {state.toDo.items.length || state.toDo.items.length ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ListContainer
              title={state.toDo.title}
              itemsList={state.toDo.items}
              primaryAction={updateStatus}
            />
          </Grid>
          <Grid item xs={6}>
            <ListContainer
              title={state.completed.title}
              itemsList={state.completed.items}
              primaryAction={updateStatus}
              secondaryAction={removeItem}
            />
          </Grid>
        </Grid>
      ) : (
        <h3>{ERROR_MESSAGE}</h3>
      )}
    </Container>
  );
};
