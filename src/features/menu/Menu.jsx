import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../utlitis/apiRestaurant';
import MenuItem from './MenuItem';
function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="my-1 grid grid-cols-1 grid-rows-3 gap-2 px-5 md:grid-cols-2 lg:grid-cols-3">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
