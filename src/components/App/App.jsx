import React from "react";
import { useCallback, useEffect, useState } from "react";
import { ListContainer } from "../index";
import { tasksService } from "../../services/tasksService";
import { ERROR_MESSAGE } from "../../constants/messages";
import Grid from '@mui/material/Grid';

export const App = () => {
  const [list, setList] = useState([]);
  const [state, updateState] = useState([]);

  useEffect(() => {
    (async () => setList(await tasksService.get().catch(alert)))();
  }, []);

  const moveItemToAnotherContainer = useCallback((startIndex, finalIndex) => {
    updateState((prevState) => {
      const state = [...prevState];
      const element = state[startIndex].items.shift();
      state[finalIndex].items.unshift(element);
      return state;
    });
  }, []);

  const removeItemFromDashboard = useCallback((coloumnIndex) => {
    updateState((prevState) => {
      const currentList = prevState[coloumnIndex].items;
      const removedItem = currentList[currentList.length - 1];

      (async (id) => {
        if (id) {
          return await tasksService.detele(id).then(() => {
            updateState((prevState) => {
              const state = [...prevState];
              state[coloumnIndex].items.pop();
              return state;
            });
          });
        }
      })(removedItem?.id);

      return prevState;
    });
  }, []);

  useEffect(() => {
    if (list.length) {
      updateState([
        {
          title: "To Do",
          items: [...list],
          actions: [
            {
              handler: () => moveItemToAnotherContainer(0, 1),
              name: "Move to Completed",
            },
          ],
        },
        {
          title: "Completed",
          items: [],
          actions: [
            {
              handler: () => removeItemFromDashboard(1),
              name: "Remove last item",
            },
          ],
        },
      ]);
    }
  }, [list]);

  return (
    <Grid container spacing={2}>
      {(state &&
        list.length &&
        state.map((coloumn, index) => (
          <Grid item xs={12/state.length} key={index}>
            <ListContainer
              title={coloumn.title}
              itemsList={coloumn.items}
              primaryAction={coloumn.items.length && coloumn.actions[0]}
              secondaryAction={coloumn.items.length && coloumn.actions[1]}
            />
          </Grid>
        ))) || <h2>{ERROR_MESSAGE}</h2>}
    </Grid>
  );
};
