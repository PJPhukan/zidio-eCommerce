import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "cartItems";

const CartContext = createContext(null);

const readCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const quantityToAdd = Number(product.quantity) || 1;
    const size = product.size || "";

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingIndex === -1) {
        return [...prev, { ...product, size, quantity: quantityToAdd }];
      }

      return prev.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    });
  };

  const updateQuantity = (id, size, quantity) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: safeQuantity }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const removeProductFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCart = useCallback(
    (id, size) =>
      cartItems.some((item) =>
        size === undefined ? item.id === id : item.id === id && item.size === size
      ),
    [cartItems]
  );

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartMrpTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartDiscountTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const offPercent = Math.max(0, Math.min(100, Number(item.offPercent) || 0));
        const discountPerUnit = item.price * (offPercent / 100);
        return sum + discountPerUnit * item.quantity;
      }, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartMrpTotal - cartDiscountTotal,
    [cartMrpTotal, cartDiscountTotal]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      removeProductFromCart,
      isInCart,
      clearCart,
      cartCount,
      cartMrpTotal,
      cartDiscountTotal,
      cartTotal,
    }),
    [cartItems, cartCount, cartMrpTotal, cartDiscountTotal, cartTotal, isInCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
