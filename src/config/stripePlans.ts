interface Price {
  amount: string;
  priceIds: {
    test: string;
    production: string;
  };
}

export interface Plan {
  name: string;
  slug: string;
  price: {
    onetime: Price;
    monthly: Price;
    yearly: Price;
  };
}

export const PLANS = [
  {
    name: "Pro",
    slug: "pro",
    price: {
      onetime: {
        amount: '299 ($3.59)',
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_TEST,
          production: process.env.STRIPE_PRICE_ID_PROD,
        },
      },
      monthly: {
        amount: '299 ($3.59)',
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_TEST,
          production: process.env.STRIPE_PRICE_ID_PROD,
        },
      },
      yearly: {
        amount: '299 ($3.59)',
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_YEARLY_TEST,
          production: "",
        },
      },
    },
  },
  {
    name: "Writer",
    slug: "writer",
    price: {
      onetime: {
        amount: '299 ($3.59)',
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_TEST,
          production: process.env.STRIPE_PRICE_ID_PROD,
        },
      },
      monthly: {
        amount: '299 ($3.59)',
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_TEST,
          production: process.env.STRIPE_PRICE_ID_PROD,
          // production: "price_1NmMZ7FJyGSZ96lhyad2LW90", // old price
        },
      },
      yearly: {
        amount: '299 ($3.59)',
        priceIds: {
          test: process.env.STRIPE_PRICE_ID_YEARLY_TEST,
          production: "", // new price
          // production: "price_1NmMZ7FJyGSZ96lhqZEkh50e", // old price
        },
      },
    },
  },
];
