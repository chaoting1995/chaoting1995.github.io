import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import ServiceFormat from "services/format.service";

import useInterval from "./useInterval";

dayjs.extend(duration);

const useCountdown = (targetUnixTimestamp: number, distanceSecond: number = 1) => {
  const [currentTime, setCurrentTime] = React.useState<number>(dayjs().unix());
  const [isStopCondition, setIsStopCondition] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<duration.Duration>((dayjs.duration(0 * 1000, "milliseconds")));

  useInterval(() => {
    if (isStopCondition) return;
    setCurrentTime(currentTime + distanceSecond);
  }, !isStopCondition ? distanceSecond * 1000 : null);

  React.useEffect(() => {
    const targetTime = dayjs(targetUnixTimestamp);
    // `a.diff(b)` ,same as `a - b`, default unit `millisecond`
    // Difference >= 0, means not expired
    // Difference < 0, means expired
    const diffTime = targetUnixTimestamp ? targetTime.diff(currentTime, "millisecond") : 0;

    setIsStopCondition(targetUnixTimestamp <= 0 || diffTime <= 0);
    setDuration(dayjs.duration(diffTime * 1000, "milliseconds"));

  }, [targetUnixTimestamp, currentTime]);

  if (!targetUnixTimestamp) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  return {
    days: duration.days() && duration.days(),
    hours: duration.hours() && ServiceFormat.toString(duration.hours()).padStart(2, "0"),
    minutes: duration.minutes() && ServiceFormat.toString(duration.minutes()).padStart(2, "0"),
    seconds: duration.seconds() && ServiceFormat.toString(duration.seconds()).padStart(2, "0"),
  };
};

export default useCountdown;
