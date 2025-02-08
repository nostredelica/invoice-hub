"use client";

import { useDebounce } from "@/app/hooks/useDebounce";
import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import {
  getDataLocalStorage,
  setDataLocalStorage,
} from "@/app/utils/localStorageHelper";

import { successDeleteText } from "@/app/constants/actionText";
import { addNotification } from "@/app/utils/notificationHelper";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import InvoiceTable from "./layout/InvoiceTable";
import TableToolbar from "./layout/TableToolbar";
import CustomToast from "./ui/CustomToast";

const ListInvoice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [status, setStatus] = useState<string>("All Status");
  const [data, setData] = useState<InvoiceFormType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      const existingData = getDataLocalStorage("invoices") as InvoiceFormType[];
      setData(existingData);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedSearchTerm) {
      newParams.set("query", debouncedSearchTerm);
    } else {
      newParams.delete("query");
    }

    if (status && status !== "All Status") {
      newParams.set("status", status);
    } else {
      newParams.delete("status");
    }

    router.replace(`?${newParams.toString()}`);
  }, [debouncedSearchTerm, status]);

  const filteredData = useMemo(() => {
    setIsLoading(true);

    const filtered = data
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.number.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const matchesStatus = status === "All Status" || item.status === status;
        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    setTimeout(() => setIsLoading(false), 500);

    return filtered;
  }, [data, debouncedSearchTerm, status]);

  const handleDeleteInvoice = (invoiceId: string) => {
    setIsLoading(true);
    const updatedData = data.filter(
      (invoice: InvoiceFormType) => invoice.number !== invoiceId
    );
    setData(updatedData);
    setDataLocalStorage("invoices", updatedData);
    addNotification(`🗑️ Invoice ${invoiceId} deleted.`);
    setTimeout(() => {
      setIsLoading(false);
      setOpenToast(true);
    }, 500);

    setTimeout(() => setOpenToast(false), 3000);
  };

  return (
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography fontSize={26} fontWeight={700}>
            My Invoices
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TableToolbar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              status={status}
              setStatus={setStatus}
            />
          </Box>
        </Box>
        <InvoiceTable
          isLoading={isLoading}
          invoices={filteredData}
          handleDeleteInvoice={handleDeleteInvoice}
        />
      </Box>
      <CustomToast open={openToast} text={successDeleteText} />
    </Box>
  );
};

export default ListInvoice;
