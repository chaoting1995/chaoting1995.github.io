# Changelog

All notable changes to this project will be documented in this file. 123456

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.34] - 2024-09-05

### Changed
- 更新組合辯題列表資料

## [1.0.0-beta.33] - 2024-09-04

### Added
- 頁首 > Icon 添加回首頁連結
- 辯題列表 > 添加分類

### Fixed
- 辯題列表 > 進階設定 > 重置開啟狀態
- 自由辯論模式 > 計時器切換器 > 修正文案「不能切換，所有計時器已停止」

## [1.0.0-beta.32] - 2024-09-04

### Added
- 辯題列表 > 進階設定 > 下載檔案

## [1.0.0-beta.31] - 2024-09-04

### Fixed
- 「緩衝計時30秒」模板模板 bug

## [1.0.0-beta.30] - 2024-09-04

### Fixed
- head setting

## [1.0.0-beta.29] - 2024-09-04

### Added
- 透過 google sheet 管理與產生「辯題列表資料」

## [1.0.0-beta.28] - 2024-09-04

### Fixed
- 預設值與抽辯題，要考慮極端情境

## [1.0.0-beta.27] - 2024-09-04

### Added
- 新增：辯題產生器 > 抽掉辯題，不進入抽題範圍 

## [1.0.0-beta.26] - 2024-09-03

### Added
- 計時器：新增預設值「緩衝計時30秒」 

## [1.0.0-beta.25] - 2024-09-03

### Added
- 計時器：新增預設值「新式奧瑞岡554制」、「新式奧瑞岡554制-結辯」 

### Changed
- 更新 index.html `<html lang='zh-Hant'>`
- 重構音頻的初始化時機
- 計時器：預設值與模板，更改順序

## [1.0.0-beta.24] - 2024-09-03

### Changed
- 更新 sitemap.xml

## [1.0.0-beta.23] - 2024-09-03

### Fixed
- 調整：音頻物件，複用＋結束時銷毀

## [1.0.0-beta.22] - 2024-09-02

### Added
- 新增：辯題列表 > 點擊辯題選項後，切換辯題選項

### Changed
- 調整：判決器 > 新增音效

## [1.0.0-beta.21] - 2024-09-02

### Fixed
- 修復：辯題列表 > vh change to innerHeigh

## [1.0.0-beta.20] - 2024-09-02

### Added
- 新增：辯題選項清單

### Changed
- 辯題選項清單預設值，更新id值

### Fixed
- 修復 localstorage key

## [1.0.0-beta.19] - 2024-09-02

### Fixed
- WARNINGHTML5 Audio pool exhausted, returning potentially locked audio object.

## [1.0.0-beta.18] - 2024-09-02

### Changed
- 調整：GA 事件名稱，拿掉前綴 `DT_`

### Added
- 新增：辯題產生器，埋設 GA 事件

## [1.0.0-beta.17] - 2024-09-02

### Changed
- 調整：判決器樣式
- 調整：辯題中間項，增加點擊音效

### Fixed
- 修復：音效 bug
- 修復：辯題產生器，彈窗高度問題

## [1.0.0-beta.16] - 2024-09-02

### Fixed
- 修復：判決器 bug
- 修復：音效 bug

## [1.0.0-beta.15] - 2024-09-02

### Added
- 新增功能：瓦力二號

### Changed
- 增補 head tags

## [1.0.0-beta.14] - 2024-08-30

### Fixed
- 修復：套用模板時，「鈴響次數設定」未同步

## [1.0.0-beta.13] - 2024-08-28

### Added
- 增加 searchParams avoidGA

## [1.0.0-beta.12] - 2024-08-28

### Added
- 新增 sitemap.xml

## [1.0.0-beta.11] - 2024-08-28

### Changed
- 計時器編輯器 > 將「鈴響次數設定」移至「響鈴時間點欄位」下方
- GA4

## [1.0.0-beta.10] - 2024-08-28

### Fixed
- 計時器編輯器 > 視窗高度不足時，彈窗自動出現捲軸

## [1.0.0-beta.9] - 2024-08-28

### Changed
- 字體大小全面調整

## [1.0.0-beta.8] - 2024-08-28

### Fixed
- 計時器編輯器 > 按照所設「響鈴次數」，正確顯示所有「響鈴時間點欄位」

## [1.0.0-beta.7] - 2024-08-28

### Fixed
- 計時器編輯器 > 修正表單驗證邏輯

## [1.0.0-beta.6] - 2024-08-28

### Added
- 計時器編輯器 > 新增「進階設定」
  - 領響次數：可動態修改鈴響次數
  - 使用模板：當用戶將所有計時器刪光，可快速復原
- 計時器列表 > 當列表為空，新增提示

## [1.0.0-beta.5] - 2024-08-27

### Fixed
- Timer > Add HeadTags

## [1.0.0-beta.4] - 2024-08-27

### Added
- GA4
- 設定 createTheme 全域樣式

### Changed
- 計時器編輯器，iOS 模式下要是「數字鍵盤」

## [1.0.0] - 2024-08-26

### Added

- 辯論計時小幫手 2.0 正式上線