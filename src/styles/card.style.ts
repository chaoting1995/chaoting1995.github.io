import { css } from "@emotion/css";
import { styleSettingColor } from "styles/variables.style";

export const styleCard = css`
  .dd-card {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 16px 8px;
    box-sizing: border-box;

    &.gutter {
      margin-bottom: 12px;
    }

    .dd-card-error-message {
      .dd-error-message-img-box {
        width: 100px;
        height: 100px;
      }
    }

    .dd-card-title {
      color: ${styleSettingColor.text.primary};
      font-weight: bold;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
    }

    .dd-card-divider {
      margin: 10px 0;
      background-color: ${styleSettingColor.bg};
      height: 2px;
      width: calc(100% + 16px);
      margin-left: -8px;
    }

    .dd-list-divider {
      margin: 0;
      background-color: ${styleSettingColor.bg};
      height: 2px;
      width: calc(100% + 16px);
      margin-left: -8px;
    }

    .dd-card-dash-divider {
      margin: 8px 0;
      border-bottom: 1px dashed ${styleSettingColor.text.primary};
      width: 100%;
      height: 1px;
    }

    .dd-card-transparent-divider {
      margin: 8px 0;
      height: 1px;
      width: 100%;
    }

    .dd-card-container {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .dd-card-row {
        display: flex;
        gap: 16px;

        .dd-card-col {
          flex-grow: 1;
        }
      }
    }

    .dd-card-grid-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      
      grid-gap: 8px;

      .dd-card-dash-divider {
        margin: 0;
      }

      .dd-card-dash-divider,
      .dd-card-grid-one-line {
        grid-column: 1 / -1;
      }
    }

    .dd-card-label {
      display: flex;
      align-items: center;
      color: ${styleSettingColor.text.secondary};
      font-size: 12px;
    }

    .dd-card-value {
      display: flex;
      align-items: center;
      color: ${styleSettingColor.text.primary};
      font-size: 14px;
      font-weight: bold;
    }

    .dd-card-label,
    .dd-card-value {
      &.color-primary {
        color: ${styleSettingColor.primary};
      }
      
      &.color-secondary {
        color: ${styleSettingColor.secondary};
      }

      &.color-danger {
        color: ${styleSettingColor.danger};
      }
    }

    .dd-card-value-secondary {
      display: flex;
      align-items: center;
      color: ${styleSettingColor.secondary};
      font-size: 11px;
    }

    .dd-card-list {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .dd-card-item {
        display: flex;
        justify-content: space-between;

        .dd-card-label {
          font-weight: bold;
        }

        .dd-card-value {
          font-size: 12px;
          font-weight: normal;

          &.green {
            color: #1e9893;
            font-weight: bold;
          }
        }
      }
    }

    .dd-card-button {
      height: 28px;
    }
  }
`;
