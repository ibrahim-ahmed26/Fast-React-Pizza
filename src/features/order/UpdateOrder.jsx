import { useFetcher } from 'react-router-dom';
import Button from '../UI/Button';
import { updateOrder } from '../utlitis/apiRestaurant';
import { useState } from 'react';
export default function UpdateOrder({ setView, priority }) {
  const fetcher = useFetcher();
  const [phone, setPhone] = useState('');
  const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str,
    );
  return (
    <div>
      <div className="absolute inset-0 bg-black/30"></div>
      <fetcher.Form
        method="PATCH"
        className="z-12 absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg backdrop-blur-md"
      >
        <button
          className="absolute right-2 top-1 rounded-full bg-yellow-400 px-2 text-xl text-yellow-100"
          onClick={(e) => {
            e.preventDefault();
            setView(false);
          }}
        >
          x
        </button>
        <div className="flex flex-col gap-4">
          <label className="font-medium">Username</label>
          <input
            type="text"
            name="username"
            required
            className="w-full rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 shadow-sm transition duration-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
          />

          <label className="font-medium">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            required
            className={`w-full rounded-md px-4 py-2 text-sm text-stone-700 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              isValidPhone(phone)
                ? 'border-stone-300 focus:border-yellow-400 focus:ring-yellow-400'
                : 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
            }`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="font-medium">Address</label>
          <input
            type="text"
            name="address"
            required
            className="w-full rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 shadow-sm transition duration-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
          />
          <div className="flex flex-col justify-end">
            {!priority && (
              <button className="w-fit justify-end rounded-xl bg-yellow-400 px-2 text-stone-800">
                Make Priority
              </button>
            )}
            {fetcher.state === 'submitting' && <p>Updating...</p>}
            {fetcher.state === 'idle' && fetcher?.data && (
              <p>Order updated ✅</p>
            )}
            <Button
              type="primary"
              onClick={() => {
                setTimeout(() => {
                  if (fetcher.state === 'idle') setView(false);
                }, 2000);
              }}
            >
              Change Order details
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const phonenumber = formData.get('phonenumber');
  const address = formData.get('address');
  const data = { priority: true, username, phonenumber, address };
  await updateOrder(params.orderId, data);
  console.log(data);
  return { success: true, updatedOrder: data };
}
