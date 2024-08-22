import React from "react";

const useTop = (): [boolean, ()=>void, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isTop, setIsTop] = React.useState<boolean>(true);

  const handleToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  React.useEffect(() => {
    const handleScroll = () => {
      let flag = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
      if (!flag) return;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      // scroll bar is at the top of the page
      if (scrollTop === 0) {
        setIsTop(true);
        return;
      }
      setIsTop(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [isTop, handleToTop, setIsTop];
};

export default useTop;
