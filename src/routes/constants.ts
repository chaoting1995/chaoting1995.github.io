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
  timer: '辯論計時小幫手 2.0',
  timers: '自訂計時器',
  topicCreator: '瓦力 2 號',
};
