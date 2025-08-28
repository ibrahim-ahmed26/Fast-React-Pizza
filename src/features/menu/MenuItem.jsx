import { formatCurrency } from '../utlitis/helpers';
import Button from '../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, getQuantityById } from '../cart/cartslice';
import DeleteItems from '../UI/DeleteItems';
import UpdateQuantity from '../UI/UpdateQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantityById(id));
  const isInCart = currentQuantity > 0;
  function handleAdditem() {
    const newItems = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItems(newItems));
    console.log(newItems);
  }
  return (
    <li className="flex flex-col items-center gap-4 rounded-lg border-b border-gray-200 p-4 transition-shadow duration-300 hover:shadow-lg sm:flex-row">
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className={`h-32 w-32 rounded-lg object-cover sm:h-28 sm:w-28 ${
            soldOut
              ? 'opacity-50 grayscale'
              : 'transition-transform duration-300 hover:rotate-2 hover:scale-105'
          }`}
        />
      </div>
      <div className="flex flex-grow flex-col gap-2 sm:gap-3">
        <p
          className={`text-lg font-semibold text-stone-700 sm:text-xl ${
            soldOut ? 'text-gray-400 line-through' : ''
          }`}
        >
          {name}
        </p>
        <p
          className={`text-sm capitalize text-stone-500 sm:text-base ${
            soldOut ? 'text-gray-400 line-through' : ''
          }`}
        >
          {ingredients.join(', ')}
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {!soldOut ? (
            <p className="text-sm font-semibold text-stone-700 sm:text-base">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-semibold text-red-500 sm:text-base">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-10">
              <UpdateQuantity pizzaid={id} currentQuantity={currentQuantity} />
              <DeleteItems pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <div className="mt-auto flex w-full justify-center sm:w-auto sm:justify-start">
              <Button
                type="primary"
                onClick={handleAdditem}
                className="w-full sm:w-auto"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
