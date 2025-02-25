"use client";
import { posthog } from "posthog-js";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const onClick = () => {
    console.log("clicked");
    posthog.capture("Test");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-700 to-emerald-900 text-white">
      <h1 className=" text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        My <span className="text-teal-300">Portfolio</span>
      </h1>
      <p className="text-2xl font-bold tracking-tight text-white sm:text-[2rem] pt-5">
        My name is Eryk Wójcik yo.
      </p>
      <Button onClick={onClick}>
        Test
      </Button>
    </main>
  );
}
