import css from './App.module.css';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import { useEffect, useMemo, useState } from 'react';
import Notification from '../Notification/Notification';

const localStorageKey = 'counters';
const initialCounters = {
  great: { count: 0, label: 'Great', good: true },
  good: { count: 0, label: 'Good', good: true },
  neutral: { count: 0, label: 'Neutral', good: true },
  bad: { count: 0, label: 'Bad', good: false },
  horrible: { count: 0, label: 'Horrible', good: false },
};
const counterColors = {
  great: 'rgb(0, 128, 0)',
  good: 'rgb(0, 255, 0)',
  neutral: 'rgb(200, 200, 0)',
  bad: 'rgb(255, 0, 0)',
  horrible: 'rgb(128, 0, 0)',
};

export default function App() {
  const [counters, setCounters] = useState(() => readLocalStorageCounters());

  const totalFeedback = useMemo(() => {
    return Object.values(counters).reduce((acc, { count }) => acc + count, 0);
  }, [counters]);

  const positivePercentage = useMemo(() => {
    const goodFeedback =
      Object.values(counters)
        .filter(({ good }) => true === good)
        .reduce((acc, { count }) => acc + count, 0) ?? 0;
    return totalFeedback > 0 ? Math.round((goodFeedback / totalFeedback) * 100) : 0;
  }, [counters, totalFeedback]);

  function updateFeedback(key) {
    setCounters(prevCounters => ({
      ...prevCounters,
      [key]: {
        ...prevCounters[key],
        count: prevCounters[key].count + 1,
      },
    }));
  }

  function handleReset() {
    localStorage.removeItem(localStorageKey);
    setCounters(initialCounters);
  }

  function readLocalStorageCounters() {
    const returnCounters = { ...initialCounters };
    let lsData = {};

    try {
      lsData = JSON.parse(localStorage.getItem(localStorageKey));
    } catch {
      return returnCounters;
    }

    for (const key in lsData) {
      if (returnCounters[key]) returnCounters[key] = { ...returnCounters[key], count: !isNaN(lsData[key]) ? lsData[key] : 0 };
    }

    return returnCounters;
  }

  useEffect(() => {
    const saveCounters = {};
    for (const key in counters) saveCounters[key] = counters[key].count;

    localStorage.setItem(localStorageKey, JSON.stringify(saveCounters));
  }, [counters]);

  return (
    <div className={css.app}>
      <div className={css.card}>
        <Description title="Sip Happens Café" text="Please leave your feedback about our service by selecting one of the options below" />
      </div>
      <div className={css.card}>
        <Options counters={counters} colors={counterColors} updateFeedback={updateFeedback} handleReset={handleReset} totalFeedback={totalFeedback} />
      </div>
      <div className={css.card}>
        {totalFeedback > 0 ? (
          <Feedback counters={counters} colors={counterColors} totalFeedback={totalFeedback} positiveFeedback={positivePercentage} />
        ) : (
          <Notification message="No feedback yet" />
        )}
      </div>
    </div>
  );
}
