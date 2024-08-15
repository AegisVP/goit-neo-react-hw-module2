import css from './Notification.module.css';
import PropTypes from 'prop-types';

export default function Notification({ message }) {
  return <div className={css.card}>{message}</div>;
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
