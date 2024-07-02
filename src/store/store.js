import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : {
        totalItems : 0,
        totalAmount : 0,
        items : []
    }
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addItem : (state, action) => 
        {
            debugger;
            state.cart.items.push(action.payload);
            state.cart.totalItems = state.cart.totalItems + action.payload.quantity;
            state.cart.totalAmount = state.cart.totalAmount + (action.payload.price * action.payload.quantity);

        },

        updateItem : (state, action) => {
            let index = state.cart.items.findIndex( item => item.id === action.payload.id);
            state.cart.totalItems = state.cart.totalItems - state.cart.items[index].quantity +  action.payload.quantity;
            state.cart.totalAmount = state.cart.totalAmount - (state.cart.items[index].price * state.cart.items[index].quantity) + (action.payload.price * action.payload.quantity);
            state.cart.items[index].quantity = action.payload.quantity;
        },

        removeItem : (state, action) => {
            let index = state.cart.items.findIndex( item => item.id === action.payload.id);
            state.cart.totalItems = state.cart.totalItems - state.cart.items[index].quantity;
            state.cart.totalAmount = state.cart.totalAmount - (action.payload.price * action.payload.quantity);
            state.cart.items.splice(index, 1);

        }
    }
});

export const store = configureStore({
    reducer : cartSlice.reducer
});

export const cartActions = cartSlice.actions;
