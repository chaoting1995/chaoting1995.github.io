import { css } from "@emotion/css";
import { styleSettingColor } from "styles/variables.style";

export const styleButton = css`
  button, a {
    &.MuiButton-root {
      text-transform: none;
      white-space: nowrap;

      &.Mui-disabled {
        background-color: ${styleSettingColor.disabled};
      }
    }

    &.dd-gradient-button,
    &.dd-primary-button,
    &.dd-secondary-button,
    &.dd-light-button,
    &.dd-dark-button,
    &.dd-gradient-button {
      &.MuiButton-root {
        box-shadow: unset;
       
        &:hover {
          box-shadow: unset;
        }

        &.Mui-disabled {     
          background-color: ${styleSettingColor.disabled};
        }
      }
    }

    &.dd-gradient-button,
    &.dd-primary-button,
    &.dd-secondary-button,
    &.dd-dark-button,
    &.dd-light-button {
      position: relative;
      font-size: 12px;
    }

    &.dd-gradient-button {
      border-radius: 4px;
      height: 30px;
      background: linear-gradient(277.65deg, #FB8E89 0%, #802795 102.88%);
      font-weight: bolder;
      color: #ffffff;
    }

    &.dd-primary-button,
    &.dd-secondary-button,
    &.dd-light-button,
    &.dd-dark-button {
      border-radius: 10px;
    }
    
    &.dd-primary-button {
      background-color: ${styleSettingColor.primary};
      color: #ffffff;

      &:hover {
        background-color: ${styleSettingColor.primary};
      }
    }

    &.dd-secondary-button {
      background-color: ${styleSettingColor.secondary};
      color: #ffffff;
      
      &:hover {
        background-color: ${styleSettingColor.secondary};
      }
    }
    
    &.dd-light-button {
      background-color: ${styleSettingColor.light};
      color: ${styleSettingColor.text.primary};

      &:hover {
        background-color: ${styleSettingColor.light};
      }
    }
   
    &.dd-dark-button {
      background-color: ${styleSettingColor.text.primary};
      color: #fff;

      &:hover {
        background-color: ${styleSettingColor.text.primary};
      }
    }

    &.MuiButton-outlined {
          
      &.dd-primary-button {
        border: 1px solid ${styleSettingColor.primary};
        background-color: #ffffff;
        color: ${styleSettingColor.primary};

        &:hover {
          background-color: #ffffff;
        }
      }

    }

  }

  /* .dd-button {
    position: relative;
    background-color: ${styleSettingColor.primary};
    border-radius: 7px;
    
    &-text-hide {
      visibility: hidden;
    }

    .MuiCircularProgress-root {
      position: absolute;
    }

    .MuiFormHelperText-root {
      position: relative;
      top: 3px;
      height: 0;
      text-align: center;
      margin-top: 0;
    }
  } */
`;