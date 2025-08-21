import { Link } from 'react-router-dom';
import SearchOrder from '../order/SearchOrder';
import Username from '../user/UserName';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 p-4 sm:p-6">
      <Link
        to="/"
        className="uppercase tracking-widest first-letter:text-stone-100"
      >
        Fast React Pizza Co.{' '}
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
