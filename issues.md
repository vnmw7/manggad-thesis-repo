./app/_components/Header.tsx
Error:   × You're importing a component that needs `useState`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
  │
  │  Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

   ╭─[C:\Users\takan\OneDrive\Desktop\manggad-thesis-repo\Frontend\app\_components\Header.tsx:1:1]
 1 │ import { useState, useEffect, useRef } from "react";
   ·          ────────
 2 │ import { useRouter } from "next/navigation";
 3 │ import Image from "next/image";
 3 │ import { motion, AnimatePresence, Variants } from "framer-motion";

   ╰────
  × You're importing a component that needs `useEffect`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
  │
  │  Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

   ╭─[C:\Users\takan\OneDrive\Desktop\manggad-thesis-repo\Frontend\app\_components\Header.tsx:1:1]
 1 │ import { useState, useEffect, useRef } from "react";
   ·                    ─────────
 2 │ import { useRouter } from "next/navigation";
 3 │ import Image from "next/image";
 3 │ import { motion, AnimatePresence, Variants } from "framer-motion";

   ╰────
  × You're importing a component that needs `useRef`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
  │
  │  Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

   ╭─[C:\Users\takan\OneDrive\Desktop\manggad-thesis-repo\Frontend\app\_components\Header.tsx:1:1]
 1 │ import { useState, useEffect, useRef } from "react";
   ·                               ──────
 2 │ import { useRouter } from "next/navigation";
 3 │ import Image from "next/image";
 3 │ import { motion, AnimatePresence, Variants } from "framer-motion";

   ╰────
  × You're importing a component that needs `useRouter`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
  │
  │  Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

   ╭─[C:\Users\takan\OneDrive\Desktop\manggad-thesis-repo\Frontend\app\_components\Header.tsx:2:1]
 1 │ import { useState, useEffect, useRef } from "react";
 2 │ import { useRouter } from "next/navigation";
   ·          ─────────
 3 │ import Image from "next/image";
 4 │ import { motion, AnimatePresence, Variants } from "framer-motion";
 4 │ import {

   ╰────

Import trace for requested module:
./app/_components/Header.tsx
./app/(user)/[id]/page.tsx <anonymous code>:1:145535
