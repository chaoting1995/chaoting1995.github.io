export const PAGE_LINKS = {
  timer: "timer",
  timerID: "timer/:id",
  timers: "timers"
};

export const pageLinks = Object.fromEntries(
  Object.entries(PAGE_LINKS).map(([key, value]) => [key, "/" + value])
) as typeof PAGE_LINKS;