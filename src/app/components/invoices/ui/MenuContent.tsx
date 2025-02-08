import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Image from "next/image";

const mainListItems = [
  { text: "Add Invoice", icon: "/images/svg/add-invoice-icon.svg" },
  { text: "My Invoices", icon: "/images/svg/add-invoice-icon.svg" },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
              <Image src={item.icon} alt={item.text} width={18} height={18} />
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
