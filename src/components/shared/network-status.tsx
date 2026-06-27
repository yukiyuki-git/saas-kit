"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    function handleOnline() {
      setIsOnline(true);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }

    function handleOffline() {
      setIsOnline(false);
      setShow(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50">
      <Badge variant={isOnline ? "default" : "destructive"} className="px-4 py-1">
        {isOnline ? (
          <>
            <Wifi className="mr-1 h-3 w-3" />
            Back online
          </>
        ) : (
          <>
            <WifiOff className="mr-1 h-3 w-3" />
            You are offline
          </>
        )}
      </Badge>
    </div>
  );
}
