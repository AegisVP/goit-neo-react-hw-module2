import css from './Description.module.css';

export default function Description({ title = null, text = null }) {
  return (
    <div>
      {title && <h1 className={css.title}>{title}</h1>}
      {text && <p className={css.text}>{text}</p>}
    </div>
  );
}
