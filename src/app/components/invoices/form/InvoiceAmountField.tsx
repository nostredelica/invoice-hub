/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatAmount, parseNumber } from "@/app/utils/formatData";
import { gray } from "@/app/utils/themePrimitives";
import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomFormLabel from "../ui/CustomFormLabel";

const InvoiceAmountField = ({ control, errors }: any) => (
  <Box width={500}>
    <CustomFormLabel text={"Amount"} />
    <Box
      sx={{
        display: "flex",
        borderRadius: "8px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 81,
          height: 53,
          backgroundColor: gray[100],
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          color: gray[500],
        }}
      >
        <Typography>Rp</Typography>
      </Box>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            hiddenLabel
            placeholder="Enter your invoice amount"
            value={formatAmount(field.value)}
            onChange={(e) => field.onChange(parseNumber(e.target.value))}
            error={!!errors.amount}
            helperText={errors.amount?.message || ""}
            slotProps={{ input: { inputMode: "numeric" } }}
            sx={{
              "& fieldset": {
                borderRadius: 0,
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                },
              },
            }}
          />
        )}
      />
    </Box>
  </Box>
);

export default InvoiceAmountField;
