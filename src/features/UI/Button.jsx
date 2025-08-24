import { Link } from 'react-router-dom';

export default function Button({ children, disabled, to, type = 'primary' }) {
  const base =
    'my-3 inline-block rounded-full bg-yellow-400 px-2 py-2 capitalize text-stone-800 transition-colors duration-500 hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-3 sm:py-3';
  const styles = {
    primary: base,
    secondary:
      base +
      ' bg-stone-400 hover:bg-stone-300  focus:ring focus:bg-stone-300 focus:ring-offest-2 focus:ring-stone-300',
  };
  if (!to)
    return (
      <button disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={base}>
      {children}
    </Link>
  );
}
