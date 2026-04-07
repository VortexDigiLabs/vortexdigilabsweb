"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

export default function SparklesSection() {
  return (
    <div className="h-[40rem] w-full bg-charcoal flex flex-col items-center justify-center overflow-hidden relative">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Vortex Digi Labs
      </h1>
      <div className="w-full max-w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan to-transparent h-px w-3/4" />
        <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#00e5ff"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-charcoal [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
