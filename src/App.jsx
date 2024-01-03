import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((state) => state.modal)

  const dispatch = useDispatch()

  useEffect(() => 
    {dispatch(calculateTotal())}
  , [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return <h1>Data is loading</h1>
  }
  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;
