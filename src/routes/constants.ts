export const PAGE_LINK = {
  timer: 'timer',
  timerID: 'timer/:id',
  timers: 'timers',
  topicCreator: 'topicCreator',
};

export const pageLinks = Object.fromEntries(
  Object.entries(PAGE_LINK).map(([key, value]) => [key, '/' + value])
) as typeof PAGE_LINK;

export const PAGE_TITLE = {
  timer: '辯論計時小幫手',
  timerWithVersion: '辯論計時小幫手 2.0',
  timers: '自訂計時器',
  topicCreator: '瓦力二號',
};

export const PAGE_DESCRIPTION = {
  timer: '辯論計時小幫手',
  timerWithVersion: '辯論計時小幫手 2.0',
  timers: '自訂計時器',
  topicCreator: '瓦力二號，又名「瓦力2號」、「瓦力2號2011」、「辯題產生器」、「Wall-E Ⅱ 2011」，是哲耀學長發明的紙牌遊戲，用於辯論的鍛鍊。玩家可以在隨機配對的辯題中，大量練習不同的辯題，鍛練基本功。',
};
