"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Logo() {
  return (
    <Button className="text-sm" variant="ghost">
      <Link href="/">Home</Link>
    </Button>
  );
}
