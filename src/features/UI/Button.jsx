export default function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="my-3 inline-block rounded-full bg-yellow-400 px-2 py-2 capitalize text-stone-800 transition-colors duration-500 hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-3 sm:py-3"
    >
      {children}
    </button>
  );
}
