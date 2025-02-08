import { NotificationType } from "@/app/utils/notificationHelper";
import { Box, List, ListItem, ListItemText, Popover, Typography } from "@mui/material";
import React from "react";

type NotificationPopoverProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  notifications: NotificationType[];
};

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  anchorEl,
  open,
  handleClose,
  notifications,
}) => (
  <Popover
    id={open ? "notification-popover" : undefined}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  >
    <Box sx={{ p: 2, minWidth: 200 }}>
      <Typography fontSize={16} fontWeight={600} mb={1}>
        Notifications
      </Typography>
      <List>
        {notifications.length > 0 ? (
          notifications.map((item: NotificationType, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={item.message} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No new notifications" />
          </ListItem>
        )}
      </List>
    </Box>
  </Popover>
);

export default NotificationPopover;
