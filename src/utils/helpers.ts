
interface ICartItem {
    id: number,
    quantity: number
}

export const currencyFormat = (value: number) => {
    return value.toLocaleString() + " ₸"
}

export const addItemToCart = (id: number, quantity: number) => {
    const cart = localStorage.getItem('cart');

    if (!cart){
        localStorage.setItem('cart', JSON.stringify([{
            id, quantity
        }]));
    } else {
        const parsedCartData = JSON.parse(cart);

        const cartItemIndex = parsedCartData.findIndex((x: ICartItem) => x.id === id);

        if (cartItemIndex >= 0){
            if (quantity === 0) {
                parsedCartData.splice(cartItemIndex, 1);
            } else {
                parsedCartData.splice(cartItemIndex, 1, {id, quantity});
            }
            localStorage.setItem('cart', JSON.stringify([
                ...parsedCartData
            ]));
        } else {
            localStorage.setItem('cart', JSON.stringify([...parsedCartData, {
                id, quantity
            }]));
        }
    }
}

export const getItemsFromCart = () => {
    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
}

export const removeItemFromCart = (id: number) => {
    const cart = localStorage.getItem('cart');

    if (cart) {
        const result = JSON.parse(cart).filter((x:any) => x.id !== id);
        localStorage.setItem('cart', JSON.stringify(result));
    }
};