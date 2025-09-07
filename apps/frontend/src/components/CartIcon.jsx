import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Link
      to="/cart"
      className="relative flex items-center gap-1 text-gray-700 hover:text-green-500"
    >
      <ShoppingCart className="text-xl" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
      <span className="hidden md:inline">Cart</span>
    </Link>
  );
}
