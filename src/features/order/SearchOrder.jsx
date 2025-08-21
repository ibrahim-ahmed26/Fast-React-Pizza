import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmitFunction(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmitFunction}>
      <input
        placeholder="search Order Id #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="placeholder: w-32 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:capitalize placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-300 md:w-64 md:focus:w-72"
      />
    </form>
  );
}
