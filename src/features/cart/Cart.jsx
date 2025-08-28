import LinkButton from '../UI/ButtonLink';
import Button from '../UI/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartslice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  function handleClearItems() {
    dispatch(clearCart());
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mb-3 mt-4">Your cart, {username}</h2>
      <ul className="divide-y-2 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-4 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={handleClearItems}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
