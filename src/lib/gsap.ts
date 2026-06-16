"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

// Register the same plugin set Paper Tiger uses (GSAP 3.15).
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

  // Paper Tiger's signature easing: cubic-bezier(0.76, 0, 0.24, 1).
  // Control points P1=(0.76,0) P2=(0.24,1) -> slow in / fast middle / slow out.
  CustomEase.create("pt", "M0,0 C0.76,0 0.24,1 1,1");
  // A softer variant used for fades / menu transitions.
  CustomEase.create("pt-fast", "M0,0 C0.87,0 0.13,1 1,1");

  registered = true;
}

export { gsap, ScrollTrigger, SplitText, CustomEase };
