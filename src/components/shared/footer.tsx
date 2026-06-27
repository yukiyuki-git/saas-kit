import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Documentation" },
    { href: "/changelog", label: "Changelog" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold mb-4">
              <Zap className="h-5 w-5" />
              <span>SaaS Kit</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Build and ship your SaaS in days, not months. Production-ready
              template with everything you need.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SaaS Kit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
