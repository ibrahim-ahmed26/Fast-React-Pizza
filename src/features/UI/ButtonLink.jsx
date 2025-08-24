import { Link } from 'react-router-dom';

export default function LinkButton({ children, to, onClick }) {
  if (to)
    return (
      <Link
        to={to}
        className="px-2 text-sky-900 transition-colors duration-500 hover:text-sky-700"
      >
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      className="px-2 text-sky-900 transition-colors duration-500 hover:text-sky-700"
    >
      {children}
    </button>
  );
}
