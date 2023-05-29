import { TRootState } from "../root-reducer";

export const cart_getItems = (store: TRootState) => store.cart.items;
export const cart_isLoading = (store: TRootState) => store.cart.isLoading;
export const cart_hasError = (store: TRootState) => store.cart.hasError;
