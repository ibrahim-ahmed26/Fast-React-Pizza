import { useDispatch } from 'react-redux';
import Button from './Button';
import { decreaseQuantitiy, increaseQuantitiy } from '../cart/cartslice';

export default function UpdateQuantity({ pizzaid, currentQuantity }) {
  const dispatch = useDispatch();
  function handleIncreacse() {
    dispatch(increaseQuantitiy(pizzaid));
  }
  function handleDecrease() {
    dispatch(decreaseQuantitiy(pizzaid));
  }
  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreacse}>
        +
      </Button>
    </div>
  );
}
