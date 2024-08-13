import css from './App.module.css';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import { useEffect, useState } from 'react';

const localStorageKey = 'counters';
const initialCounters = {
  // great: { count: 0, label: 'Great', good: true },
  good: { count: 0, label: 'Good', good: true },
  neutral: { count: 0, label: 'Neutral', good: true },
  bad: { count: 0, label: 'Bad', good: false },
  // horrible: { count: 0, label: 'Horrible', good: false },
};
const counterColors = {
  // great: 'rgb(0, 128, 0)',
  good: 'rgb(0, 255, 0)',
  neutral: 'rgb(200, 200, 0)',
  bad: 'rgb(255, 0, 0)',
  horrible: 'rgb(128, 0, 0)',
};
const goodCounters = Object.keys(initialCounters).filter(key => initialCounters[key].good === true);

export default function App() {
  const [counters, setCounters] = useState(() => readLocalStorageCounters());

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
    setCounters(initialCounters);
    saveLocalStorageCounters();
  }

  function saveLocalStorageCounters() {
    localStorage.setItem(localStorageKey, JSON.stringify(counters));
  }

  function readLocalStorageCounters() {
    let localCounters = initialCounters;

    try {
      localCounters = JSON.parse(localStorage.getItem(localStorageKey));
    } catch (error) {
      return initialCounters;
    }

    if (JSON.stringify(Object.keys(localCounters)) !== JSON.stringify(Object.keys(initialCounters))) {
      handleReset();
      return initialCounters;
    }

    return localCounters;
  }

  useEffect(() => {
    setCounters(readLocalStorageCounters());

    return () => saveLocalStorageCounters();
  }, []);

  useEffect(() => {
    saveLocalStorageCounters();
  }, [counters]);

  return (
    <div className={css.app}>
      <div className={css.card}>
        <Description title="Sip Happens Café" text="Please leave your feedback about our service by selecting one of the options below" />
      </div>
      <div className={css.card}>
        <Options counters={counters} colors={counterColors} updateFeedback={updateFeedback} handleReset={handleReset} />
      </div>
      <div className={css.card}>
        <Feedback counters={counters} colors={counterColors} goodCounters={goodCounters} />
      </div>
    </div>
  );
}
