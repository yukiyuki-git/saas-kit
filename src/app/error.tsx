"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 font-bold text-lg">
          <Zap className="h-5 w-5" />
          SaaS Kit
        </div>
        <h1 className="text-7xl font-bold text-destructive">500</h1>
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" render={<Link href="/" />}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
