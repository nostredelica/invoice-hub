/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import { formatDate, formatNumber } from "@/app/utils/formatData";
import {
  Chip,
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

import theme from "@/themes";
import ConfirmationDialog from "../ui/ConfirmationDialog";
import EmptyState from "./EmptyState";
import TableActionsMenu from "./TableActionsMenu";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.custom.tableHead,
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface Props {
  invoices: InvoiceFormType[];
  isLoading: boolean;
  handleDeleteInvoice: (invoiceNumber: string) => void;
}

const InvoiceTable: React.FC<Props> = ({
  invoices,
  isLoading,
  handleDeleteInvoice,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceFormType>(
    {} as InvoiceFormType
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [invoiceAction, setInvoiceAction] = useState<string>("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - invoices.length);

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: InvoiceFormType) => {
      setIsMenuOpen(!isMenuOpen);
      setSelectedInvoice(row);
      setAnchorEl(event.currentTarget);
    },
    [isMenuOpen]
  );

  const handleMenuClose = useCallback((invoiceAction: string) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    setInvoiceAction(invoiceAction);
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ p: 4, background: theme.palette.common.white, borderRadius: 0 }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice</StyledTableCell>
              <StyledTableCell align="right">Due Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow sx={{ height: 78 * 5 }}>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : invoices.length > 0 ? (
              invoices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.number}>
                    <TableCell
                      sx={{
                        maxWidth: { xs: 100, sm: 200, md: 300 },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title={row.name}>
                        <Typography noWrap fontSize={16}>
                          {row.name}
                        </Typography>
                      </Tooltip>
                      <Tooltip title={row.number}>
                        <Typography noWrap color="#64748B" fontSize={14}>
                          {row.number}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    {/* Due Date */}
                    <TableCell align="right">
                      {formatDate(row.dueDate)}
                    </TableCell>

                    {/* Status */}
                    <TableCell align="right">
                      <Chip
                        label={row.status}
                        variant={row.status.toLowerCase() as any}
                      />
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      sx={{
                        maxWidth: { xs: 100, sm: 200, md: 300 },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      align="right"
                    >
                      <Tooltip
                        title={Number(row.amount).toLocaleString()}
                        arrow
                      >
                        <Typography noWrap fontSize={16}>
                          Rp {formatNumber(row.amount)}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="right">
                      <TableActionsMenu
                        isMenuOpen={isMenuOpen}
                        handleMenuOpen={(e) => handleMenuOpen(e, row)}
                        handleMenuClose={handleMenuClose}
                        rowData={selectedInvoice}
                        rowNumber={row.number}
                        anchorEl={anchorEl}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow sx={{ height: 78 * 5 }}>
                <TableCell colSpan={5} align="center">
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}

            {/* Prevent layout jump */}
            {!isLoading && invoices?.length > 0 && emptyRows > 0 && (
              <TableRow sx={{ height: 78 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={invoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => {
                  setPage(newPage);
                  setIsMenuOpen(false);
                }}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        open={invoiceAction === "Delete"}
        selectedValue={selectedInvoice}
        onClose={() => {
          setTimeout(() => setSelectedInvoice({} as InvoiceFormType), 100);
          setInvoiceAction("");
        }}
        handleDeleteInvoice={handleDeleteInvoice}
        setInvoiceAction={setInvoiceAction}
      />
    </>
  );
};

export default InvoiceTable;
