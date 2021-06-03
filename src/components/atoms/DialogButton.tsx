import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Button, { ButtonProps } from "./Button";
import TextField from "./TextField";

type DialogProps = {
  buttonContent: React.ReactElement | string;
  title: string;
  actionText: string;
};

type DialogButtonProps = ButtonProps & Partial<DialogProps>;

const DialogButton: React.FC<DialogButtonProps> = ({
  variant,
  width,
  height,
  color,
  background,
  title,
  buttonContent,
  actionText,
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  const handleClickClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Button
        variant={variant ?? "outlined"}
        color={color}
        background={background}
        width={width}
        height={height}
        onClick={handleClickOpen}
      >
        {buttonContent ?? "Open Dialog"}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClickClose} maxWidth="xl">
        <DialogTitle>{title ?? "Title"}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>キャンセル</Button>
          <Button onClick={handleClickClose}>
            {actionText ?? "someAction"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogButton;
