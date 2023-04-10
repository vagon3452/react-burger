export const totalPriceSelector = (state) => {
  const {
    create: { bun, ingredients },
  } = state;
  
  return [bun, ...ingredients, bun].filter(Boolean).reduce((acc, item) => {
      const currentCount = acc[item._id] ?? 0;
      const arrayId = acc["ingredients"] ?? [];
      let result = acc["totalPrice"] ?? 0;

      return {
        ...acc,
        [item._id]: currentCount + 1,
        ingredients: [...arrayId, item._id],
        totalPrice: (result += item.price),
    }
  }, {});
};
