export const PLANS = [
  {
    name: "Free",
    slug: "free",
    widget: false,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    name: "Pro",
    slug: "pro",
    widget: true,
    price: {
      amount: 14,
      priceIds: {
        test: process.env.STRIPE_PRICE_ID,
        production: "",
      },
    },
  },
];
