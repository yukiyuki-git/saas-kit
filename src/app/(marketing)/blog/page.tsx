import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

const posts = [
  {
    title: "Introducing SaaS Kit: Build Your SaaS in Days",
    description:
      "We're excited to announce SaaS Kit, an open-source full-stack SaaS template that helps you ship faster.",
    date: "Jun 15, 2025",
    tag: "Announcement",
  },
  {
    title: "How We Built Team Management with RBAC",
    description:
      "A deep dive into our team management system with role-based access control using Better Auth and Drizzle.",
    date: "Jun 10, 2025",
    tag: "Engineering",
  },
  {
    title: "Stripe Integration Guide: Subscriptions Made Easy",
    description:
      "Step-by-step guide on how we integrated Stripe for subscription billing with webhooks.",
    date: "Jun 5, 2025",
    tag: "Tutorial",
  },
  {
    title: "Why We Chose Drizzle Over Prisma",
    description:
      "Our experience switching from Prisma to Drizzle ORM and the benefits we gained.",
    date: "May 28, 2025",
    tag: "Engineering",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Insights, tutorials, and updates from the SaaS Kit team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Card key={post.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.tag}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
