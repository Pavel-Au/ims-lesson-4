import React from "react";
import { ListRow } from "../index";
import { Typography, Box, List, IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";

export const ListContainer = ({
  itemsList,
  title,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Box sx={{ border: "1px solid #ccc" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
      <List sx={{ height: "70vh", overflow: "auto" }}>
        {itemsList &&
          itemsList.map((item, index) => (
            <ListRow key={index}>
              <Typography variant="p">{item.title}</Typography>
              <IconButton
                size="small"
                aria-label="delete"
                onClick={() =>
                  primaryAction(item.id, {
                    ...item,
                    completed: !item.completed,
                  })
                }
              >
                {secondaryAction ? <RestoreIcon /> : <DoneIcon />}
              </IconButton>
              {secondaryAction ? (
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => secondaryAction(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </ListRow>
          ))}
      </List>
    </Box>
  );
};
