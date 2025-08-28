import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../utlitis/apiRestaurant';
import { useState } from 'react';
import Button from '../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../user/userSlice';
import { clearCart, getCart, getTotalPrice } from '../cart/cartslice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../utlitis/helpers';
import store from '../../store';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const useSelector(getCart) = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPirioty, setWithPirioty] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const errorHandle = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const cart = useSelector(getCart);
  const [phone, setPhone] = useState('');
  function handleSubmit() {
    if (!newUsername) return null;
    dispatch(updateName(newUsername));
  }
  const totalPrice = useSelector(getTotalPrice);
  const totatPriceWithPirioty = withPirioty ? totalPrice * 1.2 : totalPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="mt-6 max-w-2xl px-4">
      <h2 className="mb-8 text-2xl font-bold text-stone-800">
        Ready to order? Let’s go!
      </h2>

      <Form method="POST" className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-stone-700">
            First Name
          </label>
          <input
            className="w-full rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 shadow-sm transition duration-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
            type="text"
            name="customer"
            defaultValue={username}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-stone-700">
            Phone number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full rounded-md px-4 py-2 text-sm text-stone-700 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              isValidPhone(phone)
                ? 'border-stone-300 focus:border-yellow-400 focus:ring-yellow-400'
                : 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
            }`}
          />
          {errorHandle?.phone && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errorHandle.phone}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-stone-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            className="w-full rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 shadow-sm transition duration-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 rounded border-stone-300 text-yellow-500 accent-yellow-500 focus:ring-yellow-400 focus:ring-offset-1"
            checked={withPirioty}
            onChange={(e) => setWithPirioty(e.target.checked)}
          />
          <label
            htmlFor="priority"
            className="text-sm font-medium text-stone-700"
          >
            Want to give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <Button disabled={isSubmitting}>
          {isSubmitting
            ? 'Placing Order...'
            : `Order now For ${formatCurrency(totatPriceWithPirioty)}`}
        </Button>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please Provide A Correct Phone Number So We Can Reach You';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
