/* eslint-disable no-prototype-builtins */
import css from './Feedback.module.css';
import PropTypes from 'prop-types';

export default function Feedback({ counters, colors, totalFeedback }) {
  const calculatePositivePercentage = () => {
    const goodFeedback =
      Object.values(counters)
        .filter(({ good }) => true === good)
        .reduce((acc, { count }) => acc + count, 0) ?? 0;
    return totalFeedback > 0 ? Math.round((goodFeedback / totalFeedback) * 100) : 0;
  };

  return (
    <ul className={css.card}>
      {Object.keys(counters).map(key => {
        const { label, count } = counters[key];
        const baseColor = colors[key] ?? 'rgb(128, 128, 128';
        return (
          <li className={css.item} key={key} style={{ backgroundColor: 'color(from ' + (baseColor ?? '#f0f0f0') + ' srgb r g b / 0.5)' }}>
            <span className={css.label}>{label}: &nbsp; </span>
            <span className={css.percentage}>{count}</span>
          </li>
        );
      })}
      <li className={css.item} key="total" style={{ fontWeight: 'bold', backgroundColor: 'rgb(200, 200, 200)' }}>
        <span className={css.label}>Total: &nbsp; </span>
        <span className={css.percentage}>{totalFeedback}</span>
      </li>
      <li className={css.item} key="positive" style={{ fontWeight: 'bold', backgroundColor: 'rgb(200, 255, 200)' }}>
        <span className={css.label}>Positive: &nbsp; </span>
        <span className={css.percentage}>{calculatePositivePercentage()}%</span>
      </li>
    </ul>
  );
}

Feedback.propTypes = {
  counters: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  totalFeedback: PropTypes.number.isRequired,
};
