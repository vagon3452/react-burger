import { TRootState } from "../root-reducer";

export const orders_getOrder = (store: TRootState) => store.checkout.order;
export const orders_isLoading = (store: TRootState) => store.checkout.isLoading;
export const orders_hasError = (store: TRootState) => store.checkout.hasError;
