import React from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getCalendarActiveDate, getCalendarDates} from '../selectors';
import {serializeDate} from '../util/date';
import Timeline from './Timeline';

export default function Availability({participants}) {
  const availability = generateParticipantAvailability(participants);
  const dates = useSelector(getCalendarDates);
  const activeDate = useSelector(getCalendarActiveDate);
  const defaultDate = dates[0] || serializeDate(moment());

  return (
    <Timeline
      date={activeDate ? serializeDate(activeDate) : defaultDate}
      availability={availability}
    />
  );
}

function generateParticipantAvailability(participants) {
  return participants.map(participant => {
    const start = randomNumber(5, 22);
    const end = randomNumber(start + 1, 24);
    const busySlots = [
      {
        startTime: moment(start, 'k').format('k:mm'),
        endTime: moment(end, 'k').format('k:mm'),
      },
    ];
    return {participant, busySlots};
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}