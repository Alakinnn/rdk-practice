import { useSelector } from "react-redux"

const useCart = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart)
  const isCartEmpty = amount < 1
  const emptyCartPage = () => (
    <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
    </section>
  )
    
  return { cartItems, total, amount, isCartEmpty, emptyCartPage }
}

export default useCart