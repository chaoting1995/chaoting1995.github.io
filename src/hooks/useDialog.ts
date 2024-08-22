import React from "react";

export type HandleOpen = () => void;

export type HandleClose = () => void;

export type HandleTrigger = () => void;

export default function useDialog(defaultOpen: boolean): [boolean, HandleOpen, HandleClose, HandleTrigger] {
  const [open, setOpen] = React.useState<boolean>(defaultOpen);
  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);
  const handleTrigger = React.useCallback(() => setOpen(open => open ? false : true), []);
  return [open, handleOpen, handleClose, handleTrigger];
}