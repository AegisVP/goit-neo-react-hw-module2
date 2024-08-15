import css from './Options.module.css';
import PropTypes from 'prop-types';

export default function Options({ counters, colors, updateFeedback, handleReset, totalFeedback }) {
  return (
    <ul className={css.list}>
      {Object.keys(counters).map(key => {
        const { label } = counters[key];
        const baseColor = colors[key] ?? 'rgb(128, 128, 128';

        return (
          <li className={css.item} key={key}>
            <button
              className={css.button}
              type="button"
              onClick={() => updateFeedback(key)}
              style={{ backgroundColor: 'color(from ' + (baseColor || '#f0f0f0') + ' srgb r g b / 0.5)' }}
            >
              {label}
            </button>
          </li>
        );
      })}
      {totalFeedback > 0 && (
        <li className={css.item} key="reset">
          <button className={css.button} type="button" onClick={handleReset} style={{ backgroundColor: 'rgb(128, 128, 255)' }}>
            Reset
          </button>
        </li>
      )}
    </ul>
  );
}

Options.propTypes = {
  counters: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  updateFeedback: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  totalFeedback: PropTypes.number.isRequired,
};