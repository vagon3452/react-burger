import { TRootState } from "../root-reducer";

export const profile_privateFeed = (store: TRootState) =>
  store.profileFeed.privateFeed;

export const profile_status = (store: TRootState) => store.profileFeed.status;
