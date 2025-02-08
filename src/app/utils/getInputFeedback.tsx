export const getInputFeedback = (
  state: "error" | "info" | "success" | "warning",
  isEditing: boolean
) => {
  switch (state) {
    case "error":
      return {
        title: "Submission Failed",
        description:
          "There was an issue with your input. Please check the errors and try again.",
        accentColor: "hsl(0, 90%, 40%)",
      };
    case "success":
      return {
        title: isEditing
          ? "Success! Invoice Details Updated"
          : "Invoice Added Successfully!",
        description: isEditing
          ? "Your changes have been saved and the invoice is now up to date."
          : `You can view and manage your invoice in the 'My Invoices' section.`,
        bgColor: "#E1F9F0",
        accentColor: "#34D399",
      };
    default:
      return { title: "", description: "" };
  }
};
