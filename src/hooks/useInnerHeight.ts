import React from "react";

// In ios safari browser, 100vh includes address bar and tool bar.
// Use `window.innerHeight` can get height excludes address bar and tool bar.
// Also can try pure css plan : `/* mobile viewport bug fix */ min-height: -webkit-fill-available;`
const useInnerHeight = (): [number] => {
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);

  const changeInnerHeight = React.useCallback(() => setInnerHeight(window.innerHeight), []);

  React.useEffect(() => {
    window.addEventListener("resize", changeInnerHeight);
    return () => window.addEventListener("resize", changeInnerHeight);
  }, [changeInnerHeight]);

  return [innerHeight];
};

export default useInnerHeight;
