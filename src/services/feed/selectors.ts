import { TRootState } from "../root-reducer";

export const feed_publicFeed = (store: TRootState) => store.feed.publicFeed;

export const feed_status = (store: TRootState) => store.feed.status;

export const feed_error = (store: TRootState) => store.feed.connectionError;
