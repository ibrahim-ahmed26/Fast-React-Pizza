// Test ID: IIDSAT

import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../utlitis/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../utlitis/helpers';
import OrderItem from './OrderItem';
function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-2">
      <div className="mb-4 flex cursor-pointer flex-row flex-wrap items-center gap-4 space-x-2 rounded-lg border-b-2 border-yellow-300 px-1 py-4 transition-all duration-300 hover:shadow-lg sm:justify-between">
        <h2 className="text-xl font-bold">Status</h2>
        <p className="text-stone-500">
          OrderId:
          <span className="rounded-md bg-gray-700 px-1 py-1 text-yellow-400">
            {id}
          </span>
        </p>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-md bg-green-700 px-2 py-1 text-stone-200 sm:px-4">
              Priority
            </span>
          )}{' '}
          <span className="rounded-md bg-red-600 px-2 py-1 capitalize text-stone-200 sm:px-4">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between py-2 sm:gap-3">
        <p className="font-bold capitalize">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-stone-400">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="my-4 divide-y-2 border-b-2 border-t-2">
        {cart.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="space-y-2 rounded-md bg-stone-600 px-4 py-5">
        <p className="text-stone-400">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-stone-400">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold text-stone-200">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}
export default Order;
