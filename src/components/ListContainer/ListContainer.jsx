import React from "react";
import { ListRow } from "../index";
import { Typography, Box, List, IconButton, Button } from "@mui/material";
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
              {secondaryAction ? (
                <>
                  <IconButton
                    color="warning"
                    size="small"
                    onClick={() =>
                      primaryAction(item.id, {
                        ...item,
                        completed: !item.completed,
                      })
                    }
                  >
                    <RestoreIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => secondaryAction(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  sx={{ p: "0 10px", ml: 1 }}
                  onClick={() =>
                    primaryAction(item.id, {
                      ...item,
                      completed: !item.completed,
                    })
                  }
                >
                  Complete
                </Button>
              )}
            </ListRow>
          ))}
      </List>
    </Box>
  );
};
