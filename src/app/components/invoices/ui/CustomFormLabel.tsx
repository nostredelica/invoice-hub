import { Typography } from "@mui/material";

interface FormLabelProps {
  text: string;
  required?: boolean;
}

const CustomFormLabel: React.FC<FormLabelProps> = ({ text, required }) => (
  <Typography fontSize={14} fontWeight={600} gutterBottom>
    {text}{" "}
    <span style={{ color: "#F23030", display: required ? "block" : "hidden" }}>
      *
    </span>
  </Typography>
);

export default CustomFormLabel;
