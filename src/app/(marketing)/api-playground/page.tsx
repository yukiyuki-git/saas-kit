"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

const endpoints = [
  { method: "GET", path: "/api/v1/users/me", label: "Get Current User" },
  { method: "GET", path: "/api/v1/teams", label: "List Teams" },
  { method: "POST", path: "/api/v1/teams", label: "Create Team" },
  { method: "GET", path: "/api/v1/notifications", label: "Get Notifications" },
  { method: "GET", path: "/api/health", label: "Health Check" },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PATCH: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function ApiPlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [apiKey, setApiKey] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    setIsLoading(true);
    setResponse("");
    setResponseStatus(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (apiKey) {
        headers["x-api-key"] = apiKey;
      }

      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers,
      };

      if (selectedEndpoint.method !== "GET" && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(selectedEndpoint.path, options);
      setResponseStatus(res.status);

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(
        JSON.stringify(
          { error: err instanceof Error ? err.message : "Request failed" },
          null,
          2
        )
      );
      setResponseStatus(0);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard");
  }

  const curlCommand = `curl -X ${selectedEndpoint.method} \\
  ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${selectedEndpoint.path} \\
  ${apiKey ? `-H "x-api-key: ${apiKey}" \\` : ""}
  -H "Content-Type: application/json"${
    selectedEndpoint.method !== "GET" && requestBody
      ? ` \\
  -d '${requestBody}'`
      : ""
  }`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              API Playground
            </Badge>
            <h1 className="text-4xl font-bold mb-4">API Playground</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Test API endpoints directly in your browser. Try it out!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Endpoint selector */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {endpoints.map((endpoint) => (
                    <button
                      key={endpoint.path}
                      className={`w-full text-left p-2 rounded-lg border transition-colors ${
                        selectedEndpoint.path === endpoint.path
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedEndpoint(endpoint)}
                    >
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${methodColors[endpoint.method]}`}>
                          {endpoint.method}
                        </Badge>
                        <span className="text-sm font-medium">{endpoint.label}</span>
                      </div>
                      <code className="text-xs text-muted-foreground mt-1 block">
                        {endpoint.path}
                      </code>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Request builder */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Request</CardTitle>
                      <CardDescription>
                        Configure and send your API request
                      </CardDescription>
                    </div>
                    <Button onClick={handleSend} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      Send
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className={`${methodColors[selectedEndpoint.method]}`}>
                      {selectedEndpoint.method}
                    </Badge>
                    <code className="text-sm flex-1 bg-muted p-2 rounded">
                      {selectedEndpoint.path}
                    </code>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key (optional)</Label>
                    <Input
                      id="apiKey"
                      placeholder="sk_..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>

                  {selectedEndpoint.method !== "GET" && (
                    <div className="space-y-2">
                      <Label htmlFor="body">Request Body</Label>
                      <Textarea
                        id="body"
                        placeholder='{"key": "value"}'
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        rows={5}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Response */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Response</CardTitle>
                      {responseStatus !== null && (
                        <Badge
                          variant={responseStatus >= 200 && responseStatus < 300 ? "default" : "destructive"}
                          className="mt-1"
                        >
                          {responseStatus}
                        </Badge>
                      )}
                    </div>
                    {response && (
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-1 h-3 w-3" />
                        Copy
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {response ? (
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-96">
                      {response}
                    </pre>
                  ) : (
                    <div className="bg-muted p-8 rounded-lg text-center text-muted-foreground">
                      Send a request to see the response
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* cURL */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">cURL</CardTitle>
                  <CardDescription>Copy this command to use in your terminal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto pr-10">
                      {curlCommand}
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        navigator.clipboard.writeText(curlCommand);
                        toast.success("cURL command copied");
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
