import { clearCart } from "../features/cart/cartSlice"
import CartItem from "./CartItem"
import { useDispatch, useSelector } from "react-redux"
import { useCart } from "../hook/hook"
import { openModal } from "../features/modal/modalSlice"

const CartContainer = () => {
  const { cartItems, total, isCartEmpty, emptyCartPage } = useCart()
  const { isOpen } = useSelector((store) => store.modal)
  const dispatch = useDispatch()
  
  if (isCartEmpty) {
    return emptyCartPage()
  }

  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
        <h4 className="empty-cart">is currently empty</h4>
      </header>
      <div>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} {...cartItem} />
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>Total <span>${total}</span></h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>Clear cart</button>
      </footer>
    </section>
  )
}

export default CartContainer