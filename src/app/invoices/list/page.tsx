import ListInvoice from "@/app/components/invoices/ListInvoice";
import React, { Suspense } from "react";

const List = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListInvoice />
    </Suspense>
  );
};

export default List;
