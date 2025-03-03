"use client";
import { posthog } from "posthog-js";
import PixelGridBackground from "~/components/pixel-grid-background";

export default function HomePage() {
  // const onClick = () => {
  //   console.log("clicked");
  //   posthog.capture("Test");
  // };

  return (
    <main className="flex flex-col items-start justify-center bg-[#101010] text-white sm:items-center">
      <h1 className="px-4 sm:pt-64 pt-48 text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        My Portfolio
      </h1>
      <p className="px-3 sm:pt-10 pt-5 sm:pb-5 text-md font-bold tracking-tight text-white sm:text-[2rem]">
        I&apos;m <span className="text-teal-300">Eryk</span>, a software engineer.{" "}
        <br />
      </p>
      <p className="px-3 sm:text-md text-sm font-bold tracking-tight text-white sm:text-[1.5rem]">
        At some point, I&apos;ll share my work here 👀
      </p>
      <PixelGridBackground />
    </main>
  );
}
