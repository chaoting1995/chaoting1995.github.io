import React from "react";
import { AlertColor } from "@mui/material";

export type ParamsNotice = {
  message: string | JSX.Element;
  severity?: AlertColor;
  duration?: number;
  className?: string;
};

export type ParamsDialog = {
  message: string;
  img?: string;
  title?: string;
  hideCloseButton?: boolean;
  className?: string;
};

export type ParamsConfirm = ParamsDialog;

export type ContextValuePopup = {
  notice: (params: ParamsNotice) => void;
  dialog: (params: ParamsDialog) => void;
  confirm: (params: ParamsConfirm) => Promise<boolean>;
};

export const ContextPopup = React.createContext({} as ContextValuePopup);