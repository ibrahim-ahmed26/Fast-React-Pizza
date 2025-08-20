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
        className="p-0.5"
      />
    </form>
  );
}
