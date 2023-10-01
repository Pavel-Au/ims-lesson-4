import React from "react";
import { useCallback, useEffect, useState } from "react";
import { ListContainer, TaskForm } from "../index";
import { tasksService } from "../../services/tasksService";
import { ERROR_MESSAGE } from "../../constants/messages";
import { Container, Grid } from "@mui/material";

export const App = () => {
  const [list, setList] = useState([]);
  const [state, updateState] = useState({
    toDo: {
      title: "To Do",
      items: [],
    },
    completed: {
      title: "Completed",
      items: [],
    },
  });

  const refreshList = useCallback(async () => {
    setList(await tasksService.get().catch(alert));
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const updateStatus = useCallback(
    (id, payload) => {
      tasksService.put(id, payload).finally(refreshList);
    },
    [refreshList]
  );

  const removeItem = useCallback(
    (id) => {
      tasksService.detele(id).finally(refreshList);
    },
    [refreshList]
  );

  useEffect(() => {
    if (list.length) {
      updateState({
        toDo: {
          title: "To Do",
          items: [...list.filter((item) => !item.completed)],
        },
        completed: {
          title: "Completed",
          items: [...list.filter((item) => item.completed)],
        },
      });
    }
  }, [list]);

  return (
    <Container maxWidth="md">
      <TaskForm submitHandler={refreshList}></TaskForm>
      {list.length ? (
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
