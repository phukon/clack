"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { usePlausible } from "next-plausible";

const frequencies: {
  value: "monthly" | "annually";
  label: "Monthly" | "Annually";
  priceSuffix: "/month" | "/year";
}[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];
const tiers: {
  name: string;
  id: string;
  href: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  bgColor: string;
  borderColor: string;
  textColor: string;
  buttonText: string;
  mostPopular: boolean;
}[] = [
  {
    name: "Free",
    id: "tier-free",
    href: "/auth/register",
    price: { monthly: "$0", annually: "$0" },
    description: "The essentials to start tracking your writing habit effortlessly.",
    features: ["Encrypted Documents", "Unlimited Clack documents", "Google Docs integration"],

    bgColor: "bg-gray-200",
    borderColor: "#bg-gray-800",
    textColor: "#bg-gray-800",
    buttonText: "Start for free",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/dash/billing",
    price: { monthly: "$4", annually: "$36" },
    description: "The essentials to help track everything.",
    features: [
      "Everything in Free, plus:",
      "Unlimited Clack documents",
      "Notion Integration",
      "Unlimited Google & Notion documents",
      "Notion Widgets",
      "6 heatmap themes",
      "AI Document Assistant incl. 1000 credits",
    ],
    bgColor: "bg-gray-200",
    borderColor: "#bg-gray-800",
    textColor: "#bg-gray-800",
    buttonText: "Choose Pro",
    mostPopular: false,
  },
];

export default function PricingPage() {
  // const plausible = usePlausible();
  // plausible;
  const frequency = frequencies[0];
  const user = useCurrentUser();
  // const handleSubmit = async () => {
  //   try {
  //     const response = await createStripeSubscription();
  //     window.location.href = response?.url || "/dash";
  //   } catch (error) {
  //     console.error("Error creating Stripe subscription:", error);
  //     // Handle error gracefully, for example, show an error message to the user
  //   }
  // };

  return (
    <>
      <div className="flex flex-1 flex-col bg-white text-black gap-2 md:pt-0 md:gap-0">
        <Header />
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <div className=" pt-20 pb-2">
            <h1 className="text-4xl md:text-6xl text-balance --local-ebgaramond">
              Choose the plan that
              <br />
              works for you
            </h1>
            <p className="text-xl mt-8 text-balance max-w-3xl">
              <span className=" --local-comfortaa">Clack</span> is an open-source writing activity tracker that
              integrates with Google Docs and Notion, and has a built-in rich text editor.
            </p>
          </div>
        </div>
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="isolate grid  grid-cols-1  md:grid-cols-2  xl:grid-cols-2 border border-black rounded-xl overflow-hidden">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="border-black border-r-0 md:odd:border-r xl:even:border-r xl:last:!border-r-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="border-b border-black p-6 bg-gray-100">
                      <h3 id={tier.id} className="text-balance text-gray-900 text-xl leading-8">
                        {tier.name}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="mt-4 text-sm leading-6 text-gray-600 text-balance">{tier.description}</p>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-balance text-4xl font-medium  text-gray-900">
                          {tier.price[frequency.value]}
                        </span>
                        <span
                          className={cn(
                            "text-sm font-semibold leading-6 text-gray-600",
                            tier.id === "tier-enterprise" ? "hidden" : ""
                          )}
                        >
                          {frequency.priceSuffix}
                        </span>
                      </p>
                      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon className="h-6 w-5 flex-none text-[#323DD6]" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link
                      href={tier.href}
                      // onClick={() => {
                      //   plausible("clickedPricing", {
                      //     props: { tier: tier.name },
                      //   });
                      // }}
                    >
                      <Button
                        className="rounded-3xl hover:bg-gray-100"
                        style={{
                          backgroundColor: tier.bgColor,
                          borderColor: tier.borderColor,
                          color: tier.textColor,
                          borderWidth: "1px",
                        }}

                        // onClick={handleSubmit}
                      >
                        {tier.name === "Pro" && user ? "Upgrade" : tier.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 md:px-8 mx-auto ">
          <div className="py-12 bg-[#323DD6] text-white rounded-3xl mx-auto px-6">
            <div className="flex lg:flex-row flex-col item-center justify-between space-y-10 lg:space-y-0">
              <h2 className="text-3xl">Wanna contribute? Clack is open-source!</h2>
              <div className="space-x-2 flex items-center">
                <Link href="https://github.com/phukon/clack" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="text-base rounded-3xl bg-transparent border-black hover:bg-gray-200 hover:text-black"
                  >
                    <FaGithub className="mr-2 h-6 w-6" />
                    View Github
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
