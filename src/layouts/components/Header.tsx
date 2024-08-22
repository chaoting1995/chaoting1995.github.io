import React from "react";
import { Link } from "react-router-dom";
import { css, cx } from "@emotion/css";
import { IconButton, Button } from "@mui/material";
import { List, X } from "@phosphor-icons/react";

import useDialog from "hooks/useDialog";
import useTop from "hooks/useTop";
import Logo from "assets/logo.svg?react";
import { breakpoints, styleSettingColor, styleSettingHeight, styleSettingZIndex } from "styles/variables.style";
import { pageLinks } from "routes/constants";
import Sidebar from "layouts/components/Sidebar/Sidebar";
import SidebarMenu from "layouts/components/Sidebar/components/SidebarMenu/SidebarMenu";
import menu from "layouts/components/Sidebar/menu";

const Header = () => {
  const [isTop] = useTop();
  const [openDrawer, handleOpenDrawer, handleCloseDrawer, handleToggleDrawer] = useDialog(false);

  return (
    <header className={cx("DD-Header", style(isTop))}>
      <div className="header-fixed">
        <div className="header-container">
          <div className="header-to-home">
            <div className="header-logo">
              <Logo />
            </div>
            <div>辯論計時小幫手 2.0</div>
          </div>
          <SidebarMenu className="header-menu" list={menu} />
          <Button variant="contained" className="dd-gradient-button header-to-stake" component={Link} to={pageLinks.timer}>Stake</Button>
          <IconButton className="header-menu-button" title="menu" onClick={handleToggleDrawer}>
            {openDrawer ? <X color="inherit" /> : <List color="inherit" />}
          </IconButton>
        </div>
      </div>
      <Sidebar open={openDrawer} onOpen={handleOpenDrawer} onClose={handleCloseDrawer} />
    </header>
  );
};

export default Header;

const style = (_isTop: boolean) => css`
  position: relative;
  height: ${styleSettingHeight.header};
  width: 100%;
  background-color: ${styleSettingColor.background.default};

  .header-fixed {
    position: fixed;
    top: 0px;
    z-index: ${styleSettingZIndex.header};
    width: 100%;
    height: ${styleSettingHeight.header};
    background-color: ${styleSettingColor.background.dark};
    transition: 0.5s;
    box-shadow: ${_isTop
    ? "unset"
    : "0 2.8px 2.2px 0 rgb(178 183 219 / 1%), 0 6.7px 5.3px 0 rgb(178 183 219 / 2%), 0 12.5px 10px 0 rgb(178 183 219 / 3%), 0 22.3px 17.9px 0 rgb(178 183 219 / 3%),0 41.8px 33.4px 0 rgb(178 183 219 / 4%), 0 100px 80px 0 rgb(178 183 219 / 5%)"};

    .header-container {
      padding: 9px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .header-to-home {
        margin-right: auto; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${styleSettingColor.text.primary};
        font-size: 20px;

        .header-logo {
          margin-right: 5px;
          display: inline-block;
          width: 30px;
          height: 30px;
    
          svg {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }
        }
      }

      .header-testnet-tag {
        margin-left: 5px;
        background-color: ${styleSettingColor.warning};
        border-radius: 5px;
        padding: 3px 6px;
        box-sizing: border-box;
        font-size: 12px;
      }

      .header-menu {
        margin-left: auto;
        display: flex;

        @media(max-width: ${breakpoints.md}) {
          display: none;
        }

        .MuiButtonBase-root {
          padding: 0 8px;
        }

        .MuiListItemIcon-root {
          font-size: 16px;
          min-width: 23px;
          color: ${styleSettingColor.primary};
        }

        .MuiTypography-root {
          font-size: 16px;
        }
      }

      .header-to-stake {
        margin-left: 8px;
        width: 60px;
      }

      .header-menu-button {
        margin-left: 8px;

        @media(min-width: ${breakpoints.md}) {
          display: none;
        }
      }
    }
  }
`;