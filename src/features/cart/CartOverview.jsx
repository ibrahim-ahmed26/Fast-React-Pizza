import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice, getTotalQuantity } from './cartslice';
import { formatCurrency } from '../utlitis/helpers';

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);
  if (!totalQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-700 p-4 uppercase text-stone-200">
      <p className="space-x-4">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart"> Open cart &rarr; </Link>
    </div>
  );
}

export default CartOverview;
