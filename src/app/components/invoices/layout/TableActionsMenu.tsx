/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type TableActionsMenuProps = {
  isMenuOpen: boolean;
  handleMenuOpen: (e: any, rowData: InvoiceFormType) => void;
  handleMenuClose: (invoiceAction: string) => void;
  rowData: InvoiceFormType;
  rowNumber: string;
  anchorEl: HTMLElement | null;
};

const TableActionsMenu: React.FC<TableActionsMenuProps> = ({
  isMenuOpen,
  handleMenuOpen,
  handleMenuClose,
  rowData,
  anchorEl,
}) => {
  const router = useRouter();

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        id="action-button"
        aria-controls={isMenuOpen ? "action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={(event) => handleMenuOpen(event, rowData)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "action-button",
        }}
        elevation={1}
      >
        <MenuItem
          onClick={() => {
            router.push(`/invoices/edit/${rowData.number}`);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose("Delete");
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TableActionsMenu;
