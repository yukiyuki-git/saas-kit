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
import { Separator } from "@/components/ui/separator";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/users/me",
    description: "Get current user profile",
    auth: "API Key or Session",
    response: `{ "id": "...", "name": "John", "email": "john@example.com", "teams": [...] }`,
  },
  {
    method: "PATCH",
    path: "/api/v1/users/me",
    description: "Update current user profile",
    auth: "Session",
    body: `{ "name": "New Name", "image": "https://..." }`,
    response: `{ "success": true }`,
  },
  {
    method: "GET",
    path: "/api/v1/teams",
    description: "List user's teams",
    auth: "Session",
    response: `[{ "team": { "id": "...", "name": "My Team" }, "role": "owner" }]`,
  },
  {
    method: "POST",
    path: "/api/v1/teams",
    description: "Create a new team",
    auth: "Session",
    body: `{ "name": "My New Team" }`,
    response: `{ "id": "...", "name": "My New Team", "slug": "my-new-team" }`,
  },
  {
    method: "GET",
    path: "/api/v1/teams/:id/members",
    description: "List team members and invitations",
    auth: "Session",
    response: `{ "members": [...], "invitations": [...] }`,
  },
  {
    method: "POST",
    path: "/api/v1/teams/:id/members",
    description: "Invite a member to team",
    auth: "Session (Admin/Owner)",
    body: `{ "email": "user@example.com", "role": "member" }`,
    response: `{ "token": "...", "email": "user@example.com" }`,
  },
  {
    method: "DELETE",
    path: "/api/v1/teams/:id/members",
    description: "Remove a member from team",
    auth: "Session (Admin/Owner)",
    body: `{ "userId": "..." }`,
    response: `{ "success": true }`,
  },
  {
    method: "GET",
    path: "/api/v1/notifications",
    description: "Get user notifications",
    auth: "Session",
    params: "unread=true&limit=20",
    response: `{ "notifications": [...], "unreadCount": 5 }`,
  },
  {
    method: "PATCH",
    path: "/api/v1/notifications",
    description: "Mark notifications as read",
    auth: "Session",
    body: `{ "id": "..." } or { "readAll": true }`,
    response: `{ "success": true }`,
  },
  {
    method: "GET",
    path: "/api/v1/webhooks",
    description: "List webhook endpoints",
    auth: "Session",
    response: `[{ "id": "...", "url": "https://...", "events": [...] }]`,
  },
  {
    method: "POST",
    path: "/api/v1/webhooks",
    description: "Create a webhook endpoint",
    auth: "Session",
    body: `{ "url": "https://example.com/webhook", "events": ["user.created"] }`,
    response: `{ "id": "...", "url": "...", "secret": "whsec_..." }`,
  },
  {
    method: "POST",
    path: "/api/checkout",
    description: "Create Stripe checkout session",
    auth: "Session",
    body: `{ "priceId": "price_...", "teamId": "..." }`,
    response: `{ "url": "https://checkout.stripe.com/..." }`,
  },
  {
    method: "POST",
    path: "/api/portal",
    description: "Open Stripe customer portal",
    auth: "Session",
    body: `{ "teamId": "..." }`,
    response: `{ "url": "https://billing.stripe.com/..." }`,
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PATCH: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function ApiDocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            API Reference
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">API Reference</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Complete API documentation for SaaS Kit. Authenticate with API keys
            or session cookies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                All API endpoints require authentication via API key or session
                cookie.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">API Key</h4>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    curl -H &quot;x-api-key: sk_your_api_key&quot;{" "}
                    {process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}
                    /api/v1/users/me
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Rate Limits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Free: 100 requests/minute</li>
                    <li>• Pro: 1,000 requests/minute</li>
                    <li>• Enterprise: 10,000 requests/minute</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {endpoints.map((endpoint, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    className={`font-mono text-xs ${methodColors[endpoint.method]}`}
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm font-semibold">{endpoint.path}</code>
                </div>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Auth:
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {endpoint.auth}
                  </Badge>
                </div>
                {endpoint.params && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Params:
                    </span>
                    <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                      {endpoint.params}
                    </pre>
                  </div>
                )}
                {endpoint.body && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Body:
                    </span>
                    <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                      {endpoint.body}
                    </pre>
                  </div>
                )}
                <div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Response:
                  </span>
                  <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                    {endpoint.response}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
