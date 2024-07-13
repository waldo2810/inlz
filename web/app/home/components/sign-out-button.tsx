"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";

export default function SignOutButton() {
  return (
    <Button
      size="sm"
      variant="outline"
      className="flex items-center justify-between gap-2"
      onClick={() => {
        deleteCookie(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
        window.location.reload();
      }}
    >
      <LogOut size={14} />
      Sign out
    </Button>
  );
}
