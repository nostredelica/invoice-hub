import { InvoiceFormType } from "@/app/lib/types/invoice.types";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export interface ConfirmationDialogProps {
  open: boolean;
  selectedValue: InvoiceFormType;
  onClose: () => void;
  handleDeleteInvoice: (invoiceNumber: string) => void;
  setInvoiceAction: React.Dispatch<React.SetStateAction<string>>;
}

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    onClose,
    selectedValue,
    open,
    handleDeleteInvoice,
    setInvoiceAction,
  } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        Are you sure you want to delete{" "}
        <span style={{ color: "#3C50E0" }}>
          {selectedValue?.name} - {selectedValue?.number}?
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} autoFocus>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleDeleteInvoice(selectedValue?.number);
            setInvoiceAction("");
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
