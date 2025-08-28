import { Link } from 'react-router-dom';

export default function Button({
  children,
  disabled,
  to,
  type = 'primary',
  onClick,
}) {
  const base =
    'my-3 inline-block rounded-full bg-yellow-400 px-2 py-2 capitalize text-stone-800 transition-colors duration-500 hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 sm:px-3 sm:py-3';

  const styles = {
    primary: base,
    secondary:
      base +
      ' bg-stone-400 hover:bg-stone-300 focus:bg-stone-300 focus:ring-offset-2 focus:ring-stone-300',
    round:
      'rounded-lg font-medium bg-yellow-400 px-2 py-1 transition-colors duration-500 hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 ',
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}
