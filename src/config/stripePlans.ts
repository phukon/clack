export const PLANS = [
  {
    name: "Pro",
    slug: "pro",
    price: {
      monthly: {
        amount: 4,
        priceIds: {
          test: process.env.STRIPE_PRICE_ID,
          production: "",
        },
      },
      yearly: {
        amount: 3,
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_YEARLY,
          production: "",
        },
      },
    },
  },
  {
    name: "Writer",
    slug: "writer",
    price: {
      monthly: {
        amount: 4,
        priceIds: {
          test: process.env.STRIPE_PRICE_ID,
          production: "", // new price
          // production: "price_1NmMZ7FJyGSZ96lhyad2LW90", // old price
        },
      },
      yearly: {
        amount: 3,
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_YEARLY,
          production: "", // new price
          // production: "price_1NmMZ7FJyGSZ96lhqZEkh50e", // old price
        },
      },
    },
  },
];
