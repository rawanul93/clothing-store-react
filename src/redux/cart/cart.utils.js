// utility functions allows us to keep our files clean and organise functions that we may need in multiple files in one location.

export const addItemToCart = (cartItems, cartItemToAdd) => { // cartItems iis the items that is already in our cartItems array in state. The cartItemToAdd is the new item that we want to add to the array.
    const existingCartItem = cartItems.find( // .find will return us the first item found in our array based off of the function we set up inside.
        cartItem => cartItem.id === cartItemToAdd.id // checks against the ids. Returns null if it nothing matches.
    );

    if (existingCartItem) { // if it exists i.e. if user is add item that was already inside the cart
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? { //this return exits the whole function i.e. after the .map function completes, it wont run anything else afterwards and just return us the cartItems array again but with tht appropriate quantity increased.
            ...cartItem,
            quantity: cartItem.quantity + 1
        } : cartItem)
    }
    //if the cart item doesnt exist and is a new addition, we just add it to the rest of the items with a quantity of 1 which is a property that didnt exist before. 
    return [...cartItems, {...cartItemToAdd, quantity: 1 }] //note that items are objects but the cart is an array containing those objects.
};
