"use client";

import theme from "@/themes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

const TableToolbar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  status,
  setStatus,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        id="search-input"
        hiddenLabel
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          m: 1,
          width: 216,
          borderRadius: 1.5,
          backgroundColor: theme.palette.common.white,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { border: "none" },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Select
        id="status-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        IconComponent={ExpandMoreIcon}
        displayEmpty
        sx={{
          width: 135,
          borderRadius: 1.5,
          backgroundColor: theme.palette.common.white,
          border: "none",
          "& fieldset": { border: "none" },
        }}
      >
        <MenuItem value="All Status">All Status</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Unpaid">Unpaid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </Select>
    </Box>
  );
};

export default TableToolbar;
