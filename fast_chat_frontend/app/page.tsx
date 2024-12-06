"use client"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import './globals.css'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup");
  }, [router]);

  return null; // This ensures nothing is rendered on the Home page.
}
