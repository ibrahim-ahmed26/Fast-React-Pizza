import { useDispatch } from 'react-redux';
import Button from './Button';
import { deleteItems } from '../cart/cartslice';

export default function DeleteItems({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="secondary" onClick={() => dispatch(deleteItems(pizzaId))}>
      Delete
    </Button>
  );
}
