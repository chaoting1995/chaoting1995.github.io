# debateTimer

此專案是一個使用 [React](https://reactjs.org/) 和 [TypeScript](https://www.typescriptlang.org/) 所開發的前端應用程式，並搭配 [Vite](https://vitejs.dev/) 作為開發環境。

## 目錄

- [專案介紹](#專案介紹)
- [功能特色](#功能特色)
- [安裝與使用](#安裝與使用)
- [專案結構](#專案結構)
- [技術棧](#技術棧)

## 專案介紹

此應用程式旨在提供「辦論計時小幫手」、「瓦力二號：辯題產生器」，方便辯論活動。

## 功能特色

### 辦論計時小幫手
- 可保存資料於本地端，保存「計時器列表」

#### 頁面：計時器
- 可自動依「時間點設定」，定點響鈴
- 可手動調整時間進度
- 可計時/暫停/重置
- 可手動按鈴
- 自由辯論：可在兩個計時器之間，切換計時

#### 頁面：計時器列表
- 可查看「計時器列表」
- 可增改「計時器編輯器」
- 可拖曳「調整列表順序」

#### 彈窗：計時器編輯器
- 可編輯「計時器名稱、計時器模式、鈴響時間點、增減時間點數量」
- 可選擇「計時器模式」：一般辯論/自由辯論
- 可保存「計時器列表」

#### 彈窗：計時器編輯器：進階設定
- 可導入「計時器模板」：導入到「計時器編輯器」，方便編輯

---

### 瓦力二號：辯題產生器
- 可保存資料於本地端，保存「辯題模式、中項模式、辯題選項禁用狀態」
- 透過 [GoogleSheet](https://docs.google.com/spreadsheets/d/19Kq4FNRxRojCDajOtSCdS38d_cSB_MZnXRY0Od-tDig/edit?gid=0#gid=0) 管理資料

#### 頁面：辯題產生器
- 可切換「辯題模式」：完整辯題/組合辯題
- 可抽出「辯題選項」：從列表隨機抽取
- 可選擇「辯論角色」：選手/裁判
  - 選手：可抽取持方
  - 裁判：可顯示勝負
- 可查看「辯題列表」
  - 可開合「分類群組」
  - 可禁用「辯題選項」，禁用者不會被抽中，但可手動選取

#### 頁面：辯題產生器：組合辯題
- 可切換「中項模式」：因果型辯題/比較型辯題

---

### 戰場判斷小幫手
- 儲存於本地端/最新的50筆/無限（可能塞爆） -> (TODO)
- 透過 GoogleSheet 儲存資料、管理資料
- GoogleSheet 上按照指定樣式，呈現資料 -> (TODO)

#### 頁面：戰場判斷-歷史紀錄  -> (TODO)
- 可查看「戰場判斷列表」
- 可增改「戰場判斷」

#### 頁面：戰場判斷表
- 可編輯「戰場判斷表名稱、撰寫者名稱、論點標題」
- 可選擇「論點狀態」
- 可點擊「增減列數」
- 可拖曳「調整列序」
- 可點擊「設定按鈕」開啟設定彈窗
- 可實時保存資料到本地端「戰場判斷表」 -> (TODO)
- 可下載「戰場判斷表」：PDF/PNG/CSV -> (TODO)
- 可上傳「戰場判斷表」

#### 彈窗：整列設定
- 背景顏色、向上新增、向下新增、建立副本、清除、刪除

## 安裝與使用

### 環境需求

- Node.js >= 14.0.0
- pnpm >= 6.x

### 安裝步驟

1. 克隆專案

```bash
https://github.com/chaoting1995/debateTimer.git
```

2. 進入專案目錄並安裝依賴

```bash
cd debateTimer
pnpm install
```

3. 啟動開發伺服器

```bash
pnpm run dev
```

4. 打開瀏覽器並訪問 http://localhost:3000

## 建置專案
```bash
pnpm run build
```

## 技術棧
- React - 用於構建用戶界面
- TypeScript - 型別檢查和開發時期錯誤預防
- Vite - 快速構建工具
- Material-UI - UI 元件庫