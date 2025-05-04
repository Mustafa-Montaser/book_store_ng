import { createAction, props } from "@ngrx/store";

export const updateCartCostAction = createAction("Update Cart Cost", props<{ total: number, tax: number, totalCost: number }>());