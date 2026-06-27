import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Legal
          </Badge>
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>

            <h2 className="text-2xl font-semibold mt-8">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing or using SaaS Kit, you agree to be bound by these
              Terms of Service. If you do not agree, do not use the service.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground">
              SaaS Kit provides a full-stack SaaS template and related services.
              We reserve the right to modify, suspend, or discontinue the
              service at any time.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              3. User Responsibilities
            </h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account. You
              agree not to use the service for any illegal or unauthorized
              purpose.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              4. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              SaaS Kit is open-source software licensed under the MIT License.
              You are free to use, modify, and distribute it in accordance with
              the license terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8">
              5. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              In no event shall SaaS Kit be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of your use
              of the service.
            </p>

            <h2 className="text-2xl font-semibold mt-8">6. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to update these terms at any time. We will
              notify you of any changes by posting the new terms on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-8">7. Contact</h2>
            <p className="text-muted-foreground">
              Questions about these Terms? Contact us at legal@saas-kit.dev.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
