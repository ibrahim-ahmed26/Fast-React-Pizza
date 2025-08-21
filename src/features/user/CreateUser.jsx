import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm md:text-xl">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-42 h-6 rounded-full text-center text-stone-600 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 md:h-7 md:w-72"
      />

      {username !== '' && (
        <div>
          <Link to="order/new">
            <Button>Start ordering</Button>
          </Link>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
