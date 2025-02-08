import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

type CustomToastProps = {
  open: boolean;
  text: string;
};

const CustomToast: React.FC<CustomToastProps> = ({ open, text }) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomToast;
