import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/icons";

const team = [
  {
    name: "Open Source Community",
    role: "Built by developers, for developers",
    bio: "SaaS Kit is an open-source project maintained by a community of passionate developers worldwide.",
  },
];

const values = [
  {
    title: "Developer Experience",
    description:
      "We obsess over DX. Every decision is made to make developers more productive.",
  },
  {
    title: "Open Source First",
    description:
      "Built in the open with MIT license. No vendor lock-in, no hidden costs.",
  },
  {
    title: "Production Ready",
    description:
      "Not a toy. Battle-tested patterns for authentication, billing, and team management.",
  },
  {
    title: "Community Driven",
    description:
      "Features are driven by real-world needs. Your feedback shapes the roadmap.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SaaS Kit</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe building a SaaS shouldn&apos;t take months of boilerplate
            work. SaaS Kit gives you everything you need to go from idea to
            production in days.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Mission */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              To eliminate the barrier between having a great SaaS idea and
              shipping it. We provide the foundation so you can focus on what
              makes your product unique.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Source */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Open Source</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              SaaS Kit is MIT licensed and open source. We welcome contributions
              of all kinds — code, documentation, bug reports, and feature
              requests.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/saas-kit/saas-kit"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://twitter.com/saas_kit"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <TwitterIcon className="h-4 w-4" />
                Twitter
              </a>
              <a
                href="https://saas-kit.dev"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Globe className="h-4 w-4" />
                Website
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
