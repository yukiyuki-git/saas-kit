"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-background border rounded-lg shadow-lg p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">We use cookies</p>
            <p className="text-xs text-muted-foreground mt-1">
              We use essential cookies to make our site work. We&apos;d also like
              to set optional analytics cookies to help us improve it.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={accept}>
            Accept all
          </Button>
          <Button size="sm" variant="outline" onClick={decline}>
            Essential only
          </Button>
        </div>
      </div>
    </div>
  );
}
