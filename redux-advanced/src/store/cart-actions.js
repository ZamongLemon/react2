import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const getCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://zamong-project-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("couldn't fetch cart data ");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "fail",
          title: "fail...",
          message: "failed sending data"
        })
      );
    }
  };
};
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: " sending data"
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://zamong-project-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart)
        }
      );
      if (!response.ok) {
        throw new Error("Sending data Failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success...",
          message: "successed sending data"
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "fail",
          title: "fail...",
          message: "failed sending data"
        })
      );
    }
  };
};
