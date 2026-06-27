"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Contact
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, suggestion, or just want to say hi? We&apos;d love
            to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">
                  hello@saas-kit.dev
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Discord</h3>
                <p className="text-sm text-muted-foreground">
                  Join our community
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <GithubIcon className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">GitHub</h3>
                <p className="text-sm text-muted-foreground">
                  Open an issue
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we&apos;ll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
