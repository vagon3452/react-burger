import { TContructorIngredient } from "../services/types/data";
import { ingredientArrayWithUuid } from "../utils";
import { totalPriceSelector } from "./total-price";
const [
  ingredient1,
  ingredient2,
  ingredient3,
  ingredient4,
  ingredient5,
  ingredient6,
  ingredient7,
  ingredient8,
  ingredient9,
  ingredient10,
  ingredient11,
  ingredient12,
] = ingredientArrayWithUuid;

const ingredients = [...ingredientArrayWithUuid];

const repeatIngredients = Array(5).fill(ingredient4);

const getIngredientsId = (array: TContructorIngredient[]): Array<string> =>
  array.map((el) => el._id);

const bun = null;

type test = {
  create: {
    bun: null | TContructorIngredient;
    ingredients: TContructorIngredient[];
  };
};

const state1: test = {
  create: {
    bun,
    ingredients,
  },
};
const state2: test = {
  create: {
    bun: ingredient1,
    ingredients: [],
  },
};
const state3: test = {
  create: {
    bun: null,
    ingredients: [],
  },
};

const state4: test = {
  create: {
    bun: null,
    ingredients: repeatIngredients,
  },
};

describe("teste totalPriceSelector function", () => {
  it("should return the correct price when given a bun = null and ingredients.length = 15", () => {
    const result = totalPriceSelector(state1);
    const arrayId = getIngredientsId(ingredientArrayWithUuid);
    const allDefined = result.ingredients.every(Boolean);
    expect(allDefined).toBe(true);
    expect(result.totalPrice).toBeDefined();
    expect(result.totalPrice).toBe(18743);
    expect(result.ingredients.length).toBe(15);
    expect(result.ingredients).toEqual(arrayId);
    expect(result.count).toBeDefined();
    expect(result.count.get("60666c42cc7b410027a1a9b1")).toBe(1);
    expect(result.count.size).toBe(15);
  });
  it("should return the correct bun = ingredient and ingredients.length = 0", () => {
    const result = totalPriceSelector(state2);
    const allDefined = result.ingredients.every(Boolean);
    expect(allDefined).toBe(true);
    expect(result.totalPrice).toBeDefined();
    expect(result.totalPrice).toBe(2510);
    expect(result.ingredients.length).toBe(2);
    expect(result.count.size).toBe(1);
  });
  it("should return the correct price and ingrediens, bunn = null and ingredients.length = 0", () => {
    const result = totalPriceSelector(state3);
    const allDefined = result.ingredients.every(Boolean);
    expect(allDefined).toBe(true);
    expect(result.totalPrice).toBe(0);
    expect(result.ingredients).toBeDefined();
    expect(result.ingredients.length).toBe(0);
    expect(result.count.get("60666c42cc7b410027a1a9b1")).not.toBeDefined();
    expect(result.count.size).toBe(0);
  });
  it("should return correct price and ingredients, if bun = null and repeat ingredients.length = 5", () => {
    const result = totalPriceSelector(state4);
    const allDefined = result.ingredients.every(Boolean);
    expect(allDefined).toBe(true);
    expect(result.count).toBeDefined();
    expect(result.ingredients).toBeDefined();
    expect(result.ingredients.length).toBe(5);
    expect(result.count.get("60666c42cc7b410027a1a9b7")).toBe(5);
    expect(result.count.size).toBe(1);
    expect(result.totalPrice).toBe(450);
  });
});
