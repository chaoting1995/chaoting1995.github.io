import { useNavigate } from "react-router-dom";
import { css, cx } from "@emotion/css";
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { styleSettingColor } from "styles/variables.style";

export type SidebarMenuItem = {
  label: string;
  path?: string,
  link?: string,
  isBlank?: boolean,
  icon: JSX.Element;
};

type Props = {
  className?: string;
  list: Array<SidebarMenuItem>;
  onClose?: () => void;
};

const SidebarMenu = (props: Props) => {
  const navigate = useNavigate();
  const redirectWithAnchor = (link: string, target: string = "_self") => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = target;
    anchor.click();
  };

  const handleToPage = (path: string | undefined, link: string | undefined, isBlank: boolean | undefined) => () => {
    if (path) {
      navigate(path);
    }

    if (link) {
      if(!isBlank) {
        redirectWithAnchor(link)
      } else {
        redirectWithAnchor(link, "_blank");
      }
    }

    if (props.onClose) props.onClose();
  };

  return (
    <List className={cx("SidebarMenu", style, props.className)}>
      {props.list.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton onClick={handleToPage(item.path, item.link, item.isBlank)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem className="version-info">{import.meta.env.VITE_APP_VERSION}</ListItem>
    </List>
  );
};

const style = css`
  &.MuiList-root {
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
  }

  .version-info,
  .MuiButtonBase-root {
    padding: 4px 24px;
    box-sizing: border-box;
  }

  .version-info {
    margin-top: auto;
  }

  .MuiListItemIcon-root {
    font-size: 20px;
    min-width: 30px;
    color: ${styleSettingColor.primary};
  }

  .MuiTypography-root {
    font-size: 18px;
  }
`;

export default SidebarMenu;

// TODO: Shouldn't use js to handle a link function, should use Component <Link> & element <a> for SEO