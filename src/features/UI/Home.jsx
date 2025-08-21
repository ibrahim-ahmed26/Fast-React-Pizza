import CreateUser from '../user/CreateUser';
function Home() {
  return (
    <div className="my-8 text-center">
      <h1 className="mb-4 text-sm font-semibold md:text-2xl">
        The best pizza.
        <br />
        <span className="text-yellow-500 md:text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
