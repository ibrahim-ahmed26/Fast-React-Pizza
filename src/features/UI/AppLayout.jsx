import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../cart/CartOverview';
import Loader from './Loader';
import Header from './Header';
export default function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <Outlet />
      <CartOverview />
    </div>
  );
}
