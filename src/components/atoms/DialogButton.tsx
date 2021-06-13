import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Button, { ButtonProps } from "./Button";
import TextField from "./TextField";

type DialogProps = {
  buttonText: React.ReactElement | string;
  title: React.ReactElement | string;
  actionText: string;
  canExecute: boolean;
  handleExecution: () => void;
  alertMessage: string;
  autoFocus: boolean;
};

type DialogButtonProps = ButtonProps & DialogProps;

const DialogButton: React.FC<Partial<DialogButtonProps>> = ({
  variant,
  width,
  height,
  color,
  background,
  title,
  buttonText,
  actionText,
  children,
  alertMessage,
  handleExecution,
  autoFocus,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  const handleClickClose = () => {
    setIsDialogOpen(false);
  };

  const handleExecutionWithClose = () => {
    if (!alertMessage) {
      if (handleExecution) handleExecution();
      setIsDialogOpen(false);
    } else {
      window.alert(alertMessage);
    }
  };

  return (
    <div>
      <Button
        variant={variant}
        color={color}
        background={background}
        width={width}
        height={height}
        onClick={handleClickOpen}
      >
        {buttonText ?? "Open Dialog"}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClickClose} maxWidth="xl">
        <DialogTitle>{title ?? "Title"}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>キャンセル</Button>
          <Button onClick={handleExecutionWithClose} autoFocus={autoFocus}>
            {actionText ?? "someAction"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogButton;
