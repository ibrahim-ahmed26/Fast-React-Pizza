import { formatCurrency } from '../utlitis/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li>
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-md py-3">
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="text-sm text-stone-400">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="py-2 text-sm capitalize text-stone-400">
        {isLoadingIngredients ? 'loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
