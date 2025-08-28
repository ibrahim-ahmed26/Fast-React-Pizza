import LinkButton from '../UI/ButtonLink';

function EmptyCart() {
  return (
    <div className="px-2 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 px-2 font-semibold text-stone-500">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
