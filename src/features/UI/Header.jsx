import { Link } from 'react-router-dom';
import SearchOrder from '../order/SearchOrder';
import Username from '../user/UserName';

export default function Header() {
  return (
    <header className="bg-yellow-500 p-4">
      <Link to="/" className="uppercase tracking-widest">
        Fast React Pizza Co.{' '}
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
