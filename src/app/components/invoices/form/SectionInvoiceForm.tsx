"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import CustomAlert from "@/app/components/invoices/ui/CustomAlert";
import { invoiceSchema } from "@/app/lib/schemas/invoiceSchema";
import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import {
  getDataLocalStorage,
  setDataLocalStorage,
} from "@/app/utils/localStorageHelper";
import { addNotification } from "@/app/utils/notificationHelper";
import InvoiceFields from "./InvoiceFields";

type SectionInvoiceFormProps = {
  initialData?: InvoiceFormType;
  isEditing?: boolean;
};

const SectionInvoiceForm: React.FC<SectionInvoiceFormProps> = ({
  initialData,
  isEditing,
}) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    clearErrors,
    trigger,
    setError,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      dueDate: undefined,
      amount: undefined,
      status: initialData?.status || "Pending",
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const saveFormData = (data: InvoiceFormType): string | null => {
    const existingData = getDataLocalStorage("invoices") as InvoiceFormType[];

    if (existingData.some((invoice) => invoice.number === data.number)) {
      return "Invoice number already exists. Please use a unique number.";
    }

    const updatedData = [
      ...existingData,
      { ...data, createdAt: data.createdAt || new Date().toISOString() },
    ];
    setDataLocalStorage("invoices", updatedData);

    return null;
  };

  const SubmitAdd = async (data: InvoiceFormType) => {
    setIsLoading(true);
    setAlertType(null);

    setTimeout(() => {
      const formattedData = { ...data, number: `INV${data.number}` };
      const errorMessage = saveFormData(formattedData);

      if (errorMessage) {
        setError("number", { type: "manual", message: errorMessage });
        setAlertType("error");
      } else {
        clearErrors("number");
        setAlertType("success");
        setFormSubmitted(true);

        setTimeout(() => {
          setAlertType(null);
          setFormSubmitted(false);
        }, 3000);
      }

      setIsLoading(false);
      addNotification(`✅ Invoice INV${data.number} added successfully.`);
    }, 1000);
  };

  const SubmitEdit = async (data: InvoiceFormType) => {
    setIsLoading(true);
    setAlertType(null);

    setTimeout(() => {
      const existingInvoices: InvoiceFormType[] =
        getDataLocalStorage("invoices") || [];

      const updatedInvoices = existingInvoices.map((inv) =>
        inv.number === initialData?.number
          ? {
              ...inv,
              ...data,
              number: inv.number,
              createdAt: new Date().toISOString(),
            }
          : inv
      );

      setDataLocalStorage("invoices", updatedInvoices);
      setAlertType("success");
      setFormSubmitted(true);

      setTimeout(() => {
        setAlertType(null);
        setFormSubmitted(false);
      }, 3000);

      setIsLoading(false);
      addNotification(`✏️ Invoice INV${data.number} updated successfully.`);
    }, 1000);
  };

  const onSubmit = () => (isEditing ? SubmitEdit : SubmitAdd);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ width: 1100 }}>
          <Typography mb={4} fontSize={26} fontWeight={700}>
            {isEditing ? "Edit Invoice" : "Add Invoice"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit())}
            sx={{
              width: "100%",
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ px: 4, py: 2 }}>
              <Typography fontSize={16} fontWeight={600}>
                Invoice Form
              </Typography>
            </Box>
            <Divider />

            <InvoiceFields
              isEditing={isEditing}
              initialData={initialData}
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              clearErrors={clearErrors}
              trigger={trigger}
              setValue={setValue}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 4 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 259, height: 50 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={16} />
                ) : isEditing ? (
                  "Update Invoice"
                ) : (
                  "+ Add Invoice"
                )}
              </Button>
            </Box>
          </Box>
        </Box>

        {alertType && (
          <Box
            sx={{
              mt: 4,
              width: 1100,
              visibility: formSubmitted && !isLoading ? "visible" : "hidden",
            }}
          >
            <CustomAlert severity={alertType} isEditing={isEditing ?? false} />
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default SectionInvoiceForm;
