import React, { useState, useEffect, useRef } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const TimeDisplay = ({ deadline }) => {
    let [time, setTime] = useState(new Date());
    const momentDeadline = moment(deadline);
    const days = momentDeadline.diff(time, 'days');
    const hours = momentDeadline.diff(time, 'hours');
    const minutes = momentDeadline.diff(time, 'minutes');
    const seconds = momentDeadline.diff(time, 'seconds');

    useInterval(() => {
        setTime(new Date());
    }, 1000);

    if (days > 1) {
        return <span>Time remaining: {days} days</span>
    } else if (days === 1) {
        return <span>Time remaining: 1 day</span>
    } if (hours > 1) {
        return <span>Time remaining: {hours} hours</span>
    } else if (hours === 1) {
        return <span>Time remaining: 1 hour</span>
    } if (minutes > 1) {
        return <span>Time remaining: {minutes} minutes</span>
    } else if (minutes === 1) {
        return <span>Time remaining: 1 minute</span>
    } else if (seconds > 1) {
        return <span>Time remaining: {seconds} seconds</span>
    } else if (seconds === 1) {
        return <span>Time remaining: 1 second</span>
    } else {
        return <span>No time remaining</span>
    }
}

const TimeDuration = ({ deadline }) => (
    <Label style={{ marginTop: '10px'}}>
        <Icon name="clock outline"></Icon>
        <TimeDisplay deadline={deadline} />
    </Label>
);


export default TimeDuration;