import { InboxOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const EmptyState: React.FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <InboxOutlined />
      <Typography variant="h6" color="textSecondary">
        No invoices found.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Try adjusting your search or adding a new invoice.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/invoices/add")}
      >
        Add Invoice
      </Button>
    </Box>
  );
};

export default EmptyState;
