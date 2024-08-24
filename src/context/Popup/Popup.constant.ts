import { ParamsConfirm, ParamsDialog, ParamsNotice } from "context/Popup/Popup.context";

export const BUTTON_CANCEL = "取消";
export const BUTTON_CONFIRM = "確認";

export const DEFAULT_CONFIG_NOTICE: ParamsNotice = {
  message: "",
  severity: "success",
  duration: 2000,
  className: "",
};
export const DEFAULT_CONFIG_DIALOG: ParamsDialog = {
  img: "",
  title: "",
  message: "",
  className: "",
  hideCloseButton: false,
};

export const DEFAULT_CONFIG_CONFIRM: ParamsConfirm = DEFAULT_CONFIG_DIALOG;