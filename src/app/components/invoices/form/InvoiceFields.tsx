/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import CustomFormLabel from "../ui/CustomFormLabel";
import InvoiceAmountField from "./InvoiceAmountField";

type InvoiceFormProps = {
  initialData?: InvoiceFormType;
  isEditing?: boolean;
  control: any;
  register: any;
  errors: any;
  watch: any;
  clearErrors: any;
  trigger: any;
  setValue: any;
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  isEditing = false,
  control,
  register,
  errors,
  watch,
  setValue,
}) => {
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("number", initialData.number.replace(/\D/g, ""));
      setValue(
        "dueDate",
        initialData.dueDate ? dayjs(initialData.dueDate).toDate() : new Date()
      );
      setValue("amount", initialData.amount);
      setValue("status", initialData.status);
      setValue("createdAt", new Date().toISOString());
    }
  }, [initialData, setValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          p: 4,
        }}
      >
        <Box sx={{ width: 500 }}>
          <CustomFormLabel text="Name" />
          <TextField
            hiddenLabel
            placeholder="Enter your invoice name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ width: 500 }}>
          <CustomFormLabel text="Number" />
          <TextField
            hiddenLabel
            placeholder="Enter your invoice number"
            fullWidth
            {...register("number")}
            error={!!errors.number}
            helperText={errors.number?.message}
            disabled={isEditing}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ width: 500 }}>
          <CustomFormLabel text="Due Date" />
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                format="DD/MM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                slotProps={{
                  textField: {
                    placeholder: "DD/MM/YYYY",
                    hiddenLabel: true,
                    fullWidth: true,
                    error: !!errors.dueDate,
                    helperText: errors.dueDate?.message || "",
                  },
                }}
                sx={{ mb: 2, width: "100%" }}
              />
            )}
          />
        </Box>

        <InvoiceAmountField control={control} errors={errors} />

        <Box sx={{ width: 500 }}>
          <CustomFormLabel text="Status" />
          <TextField
            hiddenLabel
            select
            fullWidth
            {...register("status")}
            defaultValue={watch("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Paid">
              Paid
            </MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default InvoiceForm;
