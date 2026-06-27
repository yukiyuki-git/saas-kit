import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Legal
          </Badge>
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>

            <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to SaaS Kit (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy explains
              how we collect, use, and share information when you use our
              service.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We collect information you provide directly, such as when you
              create an account, including your name, email address, and
              password. We also collect usage data automatically, such as your IP
              address, browser type, and pages visited.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use your information to provide and improve our service, send
              you technical notices and support messages, and communicate with
              you about products, services, and events.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              4. Information Sharing
            </h2>
            <p className="text-muted-foreground">
              We do not sell your personal information. We may share information
              with service providers who assist us in operating our service, such
              as payment processors and email delivery services.
            </p>

            <h2 className="text-2xl font-semibold mt-8">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold mt-8">6. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal
              information at any time through your account settings or by
              contacting us.
            </p>

            <h2 className="text-2xl font-semibold mt-8">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us
              at privacy@saas-kit.dev.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
