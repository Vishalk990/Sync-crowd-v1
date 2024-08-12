"use client";
import styles from "../app/pricing/pricing.module.css"
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { frequencies, tiers, CheckIcon } from "../app/pricing/pricingContent";
import { CircleDollarSign, LogIn } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import GlobalLoader from "./GlobalLoader";

export default function PricingModule() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const makePayment = async (e, tier, price) => {
    e.preventDefault();
    setIsLoading(true);

    const CLIENT_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(CLIENT_KEY);

    price = price.replace("₹", "");
    price = price.replace(",", "");

    const body = {
      tier: {
        id: tier.id,
        name: tier.name,
        credits: tier.credits
      },
      price: price,
      clerkId: user.clerkId
    };
    

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("/api/stripe-payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    console.log(session.amount_total);
    localStorage.setItem('sessionId', session.id);
    localStorage.setItem('amount', session.amount_total);

    console.log(session.id);
    console.log(session.amount_total);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
      setIsLoading(false);
    }
  };
  const [frequency, setFrequency] = useState(frequencies[0]);

  const bannerText = "Save 25% on all plans for a limited time";

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <GlobalLoader/>
        </div>
      )}
      <div
        className={`flex flex-col w-full items-center ${styles.fancyOverlay}`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full lg:w-auto mx-auto max-w-4xl lg:text-center">
              <h1 className="text-black dark:text-white lg:text-8xl bg-clip-text font-semibold leading-tight max-w-xs sm:max-w-none md:text-6xl mt-7">
                Pricing
              </h1>
            </div>

            {bannerText ? (
              <div className="w-full lg:w-auto flex justify-center my-4">
                <p className="w-full px-4 py-3 text-xs bg-slate-100 text-black dark:bg-slate-300/30 dark:text-white/80 rounded-xl">
                  {bannerText}
                </p>
              </div>
            ) : null}

            {frequencies.length > 1 ? (
              <div className="mt-16 flex justify-center">
                <RadioGroup
                  defaultValue={frequency.value}
                  onValueChange={(value) => {
                    setFrequency(frequencies.find((f) => f.value === value));
                  }}
                  className="grid gap-x-1 rounded-full p-2 text-center text-xs font-semibold leading-5 bg-white dark:bg-black ring-1 ring-inset ring-gray-200/30 dark:ring-gray-800"
                  style={{
                    gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
                  }}
                >
                  <Label className="sr-only">Payment frequency</Label>
                  {frequencies.map((option) => (
                    <Label
                      className={`cursor-pointer rounded-full px-2.5 py-2 transition-all ${frequency.value === option.value
                        ? "bg-black text-white dark:bg-slate-900/70 dark:text-white/70"
                        : "bg-transparent text-gray-500 hover:bg-slate-500/10"
                        }`}
                      key={option.value}
                      htmlFor={option.value}
                    >
                      {option.label}

                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="hidden"
                      />
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div className="mt-12" aria-hidden="true"></div>
            )}

            <div
              className={`isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none ${tiers.length === 2 ? "lg:grid-cols-2" : ""
                } ${tiers.length === 3 ? "lg:grid-cols-3" : ""}`}
            >
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`max-w-sm ring-1 rounded-3xl p-8 xl:p-10 ${tier.featured
                    ? "!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100"
                    : "bg-white dark:bg-gray-900/80 ring-gray-300/70 dark:ring-gray-700"
                    } ${tier.highlighted ? styles.fancyGlassContrast : ""}`}
                >
                  <h3
                    id={tier.id}
                    className={`text-2xl font-bold tracking-tight ${tier.featured
                      ? "text-white dark:text-black"
                      : "text-black dark:text-white"
                      }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-6 ${tier.featured
                      ? "text-gray-300 dark:text-gray-500"
                      : "text-gray-600 dark:text-gray-400"
                      }`}
                  >
                    {tier.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span
                      className={`text-4xl font-bold tracking-tight ${tier.featured
                        ? "text-white dark:text-black"
                        : "text-black dark:text-white"
                        } ${tier.discountPrice &&
                          tier.discountPrice[frequency.value]
                          ? "line-through"
                          : ""
                        }`}
                    >
                      {typeof tier.price === "string"
                        ? tier.price
                        : tier.price[frequency.value]}
                    </span>

                    <span
                      className={`${tier.featured
                        ? "text-white dark:text-black"
                        : "text-black dark:text-white"
                        }`}
                    >
                      {typeof tier.discountPrice === "string"
                        ? tier.discountPrice
                        : tier.discountPrice[frequency.value]}
                    </span>

                    {typeof tier.price !== "string" ? (
                      <span
                        className={`text-sm font-semibold leading-6 ${tier.featured
                          ? "text-gray-300 dark:text-gray-500"
                          : "dark:text-gray-400 text-gray-600"
                          }`}
                      >
                        {frequency.priceSuffix}
                      </span>
                    ) : null}
                  </p>
                  <a
                    aria-describedby={tier.id}
                    className={`flex mt-6 shadow-sm ${tier.soldOut ? "pointer-events-none" : ""
                      }`}
                  >
                    <Button
                      size="lg"
                      disabled={tier.soldOut}
                      isLoading={isLoading}
                      className={`w-full text-black dark:text-white ${!tier.highlighted && !tier.featured
                        ? "bg-gray-100 dark:bg-gray-600"
                        : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700"
                        } ${tier.featured || tier.soldOut
                          ? "bg-white dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-black"
                          : "hover:opacity-80 transition-opacity"
                        }`}
                      variant={tier.highlighted ? "default" : "outline"}
                      onClick={(e) => {
                        if (frequency.id === "1") {
                          makePayment(e, tier, tier.price[1]);
                        } else {
                          makePayment(e, tier, tier.price[2]);
                        }
                      }}
                    >
                      {tier.soldOut ? "Sold out" : tier.cta}
                    </Button>
                  </a>

                  <ul
                    className={`mt-8 space-y-3 text-sm leading-6 xl:mt-10 ${tier.featured
                      ? "text-gray-300 dark:text-gray-500"
                      : "text-gray-700 dark:text-gray-400"
                      }`}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className={`h-6 w-5 flex-none ${tier.featured ? "text-white dark:text-black" : ""
                            } ${tier.highlighted
                              ? "text-slate-500"
                              : "text-gray-500"
                            }`}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`flex gap-2 m-4 p-3 rounded-xl font-semibold ${tier.featured ? "text-white dark:text-black" : ""
                      } ${tier.highlighted ? "text-slate-500" : "text-gray-500"}`}
                  >
                    <CircleDollarSign />
                    {tier.credits}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
