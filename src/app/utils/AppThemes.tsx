"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import {
  chipGreen,
  chipOrange,
  chipRed,
  colorSchemes,
  shadows,
  shape,
  typography,
} from "./themePrimitives";

interface AppThemeProps {
  children: React.ReactNode;
}

// Extend the Chip component to recognize the new variant
declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    paid: true;
    unpaid: true;
    pending: true;
  }
}

export default function AppTheme(props: AppThemeProps) {
  const { children } = props;
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiChip: {
        variants: [
          {
            props: { variant: "paid" }, // Custom variant
            style: {
              color: chipGreen[500],
              backgroundColor: chipGreen[50],
              fontWeight: 600,
            },
          },
          {
            props: { variant: "unpaid" }, // Custom variant
            style: {
              color: chipRed[500],
              backgroundColor: chipRed[50],
              fontWeight: 600,
            },
          },
          {
            props: { variant: "pending" }, // Custom variant
            style: {
              color: chipOrange[500],
              backgroundColor: chipOrange[50],
              fontWeight: 600,
            },
          },
        ],
      },
    },
    cssVariables: {
      colorSchemeSelector: "data-mui-color-scheme",
      cssVarPrefix: "template",
    },
    colorSchemes,
    typography,
    shadows,
    shape,
  });
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
