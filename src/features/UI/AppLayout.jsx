import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../cart/CartOverview';
import Loader from './Loader';
import Header from './Header';
export default function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-2">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <Outlet />
      </div>
      <CartOverview />
    </div>
  );
}
