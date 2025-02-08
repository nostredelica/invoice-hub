"use client";

import {
  getNotifications,
  hasUnreadNotifications,
  markNotificationsAsRead,
  NotificationType,
} from "@/app/utils/notificationHelper";
import theme from "@/themes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

import { MaterialUISwitch } from "../ui/CustomSwitchMode";
import NotificationPopover from "../ui/NotificationPopover";
import ChatIcon from "../ui/svg/ChatIcon";
import NotificationIcon from "../ui/svg/NotificationIcon";

const IconButtonBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      background: "#E2E8F0",
      width: 34,
      height: 34,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      cursor: "pointer",
    }}
  >
    {children}
  </Box>
);

export default function AppNavbar() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unread, setUnread] = useState<boolean>(false);

  const { setMode } = useColorScheme();

  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setMode(isChecked ? "dark" : "light");
  };

  useEffect(() => {
    const updateNotifications = () => {
      setNotifications(getNotifications());
      setUnread(hasUnreadNotifications());
    };

    window.addEventListener("storage", updateNotifications);

    updateNotifications();

    return () => {
      window.removeEventListener("storage", updateNotifications);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUnread(false);
    markNotificationsAsRead();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <AppBar
      sx={{ backgroundColor: theme.palette.common.white, boxShadow: "none" }}
      component="nav"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <MaterialUISwitch
          onChange={handleChangeMode}
          sx={{ m: 1, transition: "all 0.2s ease-in-out" }}
        />

        <IconButtonBox>
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            aria-describedby={id}
            onClick={handleClick}
          >
            <Badge color="error" variant="dot" invisible={!unread}>
              <NotificationIcon />
            </Badge>
          </IconButton>
        </IconButtonBox>

        <NotificationPopover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleClose={handleClose}
          notifications={notifications}
        />

        <IconButtonBox>
          <Badge color="error" variant="dot">
            <ChatIcon />
          </Badge>
        </IconButtonBox>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography fontSize={14} fontWeight={600} color="#212B36">
              John Doe
            </Typography>
            <Typography fontSize={12} color="#637381">
              Verified Member
            </Typography>
          </Box>
          <Image
            src="/images/png/user.png"
            height={46}
            width={46}
            alt={"user-icon"}
          />
          <ExpandMoreIcon sx={{ fill: "#637381", cursor: "pointer" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
