"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import AddInvoiceIcon from "../ui/svg/AddInvoiceIcon";
import MyInvoicesIcon from "../ui/svg/MyInvoicesIcon";

const drawerWidth = 240;

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      text: "Add Invoice",
      icon: (color: string) => <AddInvoiceIcon color={color} />,
      path: "/invoices/add",
    },
    {
      text: "My Invoices",
      icon: (color: string) => <MyInvoicesIcon color={color} />,
      path: "/invoices/list",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false); // Close drawer on mobile
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1C2434",
          py: 4,
          px: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Image
          alt="invoice-hub-logo"
          src="/images/svg/invoice-hub-logo.svg"
          width={166}
          height={47}
        />
      </Box>

      <List>
        <Typography sx={{ px: "16px", color: "#9D9D9D" }}>MENU</Typography>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem sx={{ p: 0 }} key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(path)}>
              <ListItemIcon>
                {icon(pathname === path ? "white" : "#9D9D9D")}
              </ListItemIcon>
              <ListItemText
                sx={{ color: pathname === path ? "white" : "#9D9D9D" }}
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
