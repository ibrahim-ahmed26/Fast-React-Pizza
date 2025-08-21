import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../utlitis/apiRestaurant';
import { useState } from 'react';
import Button from '../UI/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const errorHandle = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const cart = fakeCart;
  const [phone, setPhone] = useState('');

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`input ${
                isValidPhone(phone)
                  ? 'border-gray-300 focus:ring-2 focus:ring-yellow-400'
                  : 'border-red-600 focus:ring-2 focus:ring-red-600'
              } `}
            />
            {errorHandle?.phone && <p>{errorHandle.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" className="input" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 px-8 py-2 accent-yellow-400 focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'placing Order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please Provide A Correct Phone Number So We Can Reach You';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
