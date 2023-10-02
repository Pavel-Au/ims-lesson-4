import { useState, useEffect, useCallback } from "react";
import { tasksService } from "../services/tasksService";

export const useTaskList = () => {
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

  return { state, updateStatus, removeItem, refreshList };
};
