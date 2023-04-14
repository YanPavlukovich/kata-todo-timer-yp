import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './timer.css';
import { decreaseTimer, selectTimers } from '../../store/slices/tasks-slice';

const transformTime = (time: number) => {
  const min = `${Math.trunc(time / 60)}`.padStart(2, '0');
  const sec = `${time - +min * 60}`.padStart(2, '0');

  return `${min}:${sec}`;
};

const Timer = (props: { id: any }) => {
  const { id } = props;
  const timers = useSelector(selectTimers);
  const dispatch = useDispatch();

  const [time, setTime] = useState<number>(timers[id] || 0);
  const transformedTime = transformTime(time);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (timers[id] !== undefined) {
      setTime(timers[id]);
    }
  }, [timers, id]);

  const onStartTimer = () => {
    if (intervalID === undefined) {
      const interval = setInterval(() => {
        dispatch(decreaseTimer(id));
      }, 1000);

      setIntervalID(interval);
    }
  };

  const onPauseTimer = () => {
    if (intervalID !== undefined) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    }
  };

  return (
    <span className="description timer">
      <button className="icon icon-play" onClick={onStartTimer}></button>
      <button className="icon icon-pause" onClick={onPauseTimer}></button>
      <span className={'timer__time'}>{transformedTime}</span>
    </span>
  );
};

export default Timer;
