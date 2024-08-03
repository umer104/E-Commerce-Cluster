import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstant';

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const response = await fetch(`/api/products/${id}`);
    const product = await response.json();

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}
