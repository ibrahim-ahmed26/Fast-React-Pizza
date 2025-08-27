import { useSelector } from 'react-redux';

export default function Username() {
  const userName = useSelector((state) => state.user.username);
  if (!userName) return null;
  return <p className="hidden font-semibold uppercase md:block">{userName}</p>;
}
