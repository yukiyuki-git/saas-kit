import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 font-bold text-lg">
          <Zap className="h-5 w-5" />
          SaaS Kit
        </div>
        <h1 className="text-7xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button render={<Link href="/" />}>
            Go Home
          </Button>
          <Button variant="outline" render={<Link href="/docs" />}>
            Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
