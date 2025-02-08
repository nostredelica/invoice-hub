"use client";

import SectionInvoiceForm from "@/app/components/invoices/form/SectionInvoiceForm";
import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import { getDataLocalStorage } from "@/app/utils/localStorageHelper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditInvoicePage = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState<InvoiceFormType | null>(null);

  useEffect(() => {
    const existingInvoices: InvoiceFormType[] =
      getDataLocalStorage("invoices") || [];
    const invoice = existingInvoices.find((inv) => inv.number === id);
    if (invoice) {
      setInvoiceData(invoice);
    }
  }, [id]);

  return (
    <div>
      {invoiceData ? (
        <SectionInvoiceForm initialData={invoiceData} isEditing />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditInvoicePage;
