import { Link, Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../cart/CartOverview";
import Loader from "./Loader";
import SearchOrder from "../order/SearchOrder";
export default function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <Outlet />
      <CartOverview />
    </div>
  );
}
