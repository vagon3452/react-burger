import { TRootState } from "../root-reducer";

export const create_getBun = (store: TRootState) => store.create.bun;
export const create_getIngredients = (store: TRootState) => store.create.ingredients;
