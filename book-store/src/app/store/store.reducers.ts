import { createReducer, on } from "@ngrx/store";
import { updateCartCostAction } from "./store.actions";

const initialState = {
    total       : 0, 
    tax         : 0,
    totalCost   : 0
};

export const cartCostReducer = createReducer(initialState, 
    on(updateCartCostAction, (state, { total, tax, totalCost }) => ({ total, tax, totalCost }))
);