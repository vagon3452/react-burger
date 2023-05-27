import { IOrder } from "../services/types/order";

export const orderResponse: IOrder = {
  ingredients: [
    "60d3463f7034a000269f45e7",
    "60d3463f7034a000269f45e9",
    "60d3463f7034a000269f45e8",
    "60d3463f7034a000269f45ea",
  ],
  owner: {
    name: "test Name",
    createdAt: "2021-06-23T14:43:22.587Z",
    updateAt: "2021-06-23T14:43:22.603Z",
    email: "v@mail.ru",
  },
  name: "no name",
  _id: "",
  price: 21,
  status: "done",
  number: 0,
  createdAt: "2021-06-23T14:43:22.587Z",
  updatedAt: "2021-06-23T14:43:22.603Z",
};
