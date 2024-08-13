import css from './Feedback.module.css';
import { calculateTotalFeedback } from '../../helpers/calculateTotalFeedback';

export default function Feedback({ counters, colors, goodCounters = [] }) {
  const totalFeedback = calculateTotalFeedback(counters);

  const calculatePositivePercentage = () => {
    return totalFeedback > 0
      ? Math.round((goodCounters.map(key => (counters.hasOwnProperty(key) ? counters[key].count : 0)).reduce((acc, count) => acc + count, 0) / totalFeedback) * 100)
      : 0;
  };

  return totalFeedback > 0 ? (
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
      <li className={css.item} key="positive" style={{ fontWeight: 'bold', backgroundColor: 'rgb(128, 128, 255)' }}>
        <span className={css.label}>Positive: &nbsp; </span>
        <span className={css.percentage}>{calculatePositivePercentage()}%</span>
      </li>
    </ul>
  ) : (
    <div className={css.card}>No feedback yet</div>
  );
}
