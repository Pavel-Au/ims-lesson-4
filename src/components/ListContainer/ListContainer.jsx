import React from "react";
import { ListRow } from "../index";
import { ActionButton } from "../index";
import { Typography, Box, List } from "@mui/material";

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
            <ListRow key={index}>{item.title}</ListRow>
          ))}
      </List>
      <Box sx={{ textAlign: "center" }}>
        <ActionButton
          actionHandler={primaryAction.handler}
          disabled={itemsList.length < 1}
        >
          {primaryAction.name}
        </ActionButton>
        {secondaryAction ? (
          <ActionButton
            actionHandler={secondaryAction.handler}
            disabled={itemsList.length < 1}
          >
            {secondaryAction.name}
          </ActionButton>
        ) : null}
      </Box>
    </Box>
  );
};
