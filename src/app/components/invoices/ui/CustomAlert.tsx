import { getInputFeedback } from "@/app/utils/getInputFeedback";
import { Box, Typography } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type AlertProps = {
  severity: AlertColor;
  isEditing: boolean;
};

const CustomAlert: React.FC<AlertProps> = ({ severity, isEditing }) => {
  const { title, description, bgColor, accentColor } = getInputFeedback(
    severity,
    isEditing
  );

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex" }}>
      <Box
        sx={{
          height: "100%",
          width: 7,
          background: accentColor,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        }}
      />
      <Alert
        sx={{ borderRadius: 0, background: bgColor, width: "100%" }}
        severity={severity}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
        <Typography color="#637381">{description}</Typography>
      </Alert>
    </Box>
  );
};

export default CustomAlert;
