import usePopup from "context/Popup/usePopup";

const useCopyToClipboard = () => {
  const popup = usePopup();

  const copyToClipboard = (copiedText: string, successMessage: string | JSX.Element) => {
    navigator.clipboard.writeText(copiedText)
      .then(() => {
        popup.notice({ message: successMessage });
      })
      .catch((e) => {
        console.warn("Unable to copy", e, "useCopyToClipboard");
        popup.notice({
          message: `Unable to copy`,
          severity: "error",
          duration: 5000,
        });
      });
  };
  return copyToClipboard;
};

export default useCopyToClipboard;
