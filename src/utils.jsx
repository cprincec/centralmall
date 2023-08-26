import { FaStar } from "react-icons/fa";
import "./css/App.css";

export const generateratingStars = (rating) => {
  let stars = [];
  for (let index = 0; index < Math.floor(rating); index++) {
    stars.push(<FaStar key={`start-${index + 1}`} className="rating-star" />);
  }
  return stars;
};

export const calculateCartQuantity = (cart) => {
  let quantity = 0;
  cart.forEach((product) => {
    quantity += product.quantity;
  });
  return quantity;
};

export const calculateCartTotal = (cart) => {
  let total = 0;
  cart.forEach((product) => {
    total += product.total;
  });
  return total;
};

export const calculateProductQuantity = (cart, product) => {
  if (!product || !cart) {
    return 0;
  }

  const productIndex = cart.findIndex((pro) => pro.id === product.id);
  return productIndex !== -1 ? cart[productIndex].quantity : 0;
};
