import { formatCurrency } from '../utlitis/helpers';
import DeleteItems from '../UI/DeleteItems';
import UpdateQuantity from '../UI/UpdateQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="rounded-md px-2 transition-all duration-300 hover:shadow-lg sm:flex sm:items-center sm:justify-between">
      <p className="text-xl font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaid={pizzaId} currentQuantity={quantity} />
        <DeleteItems pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
